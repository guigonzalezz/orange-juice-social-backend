import { Injectable } from '@nestjs/common'
import { CargoInterface } from '../cargo/interface/cargo.interface'
import { UsuarioInterface } from './interface/usuario.interface'
import { UsuarioCadastroInterface } from './interface/usuario_cadastro.interface'
import { UsuarioPontuacaoInterface } from './interface/usuario_pontuacao.interface'
import { S3 } from 'aws-sdk'
import * as bcrypt from 'bcrypt'
import { UsuarioRepository } from 'src/repository/database/usuario/usuario.repository'
import { BaseServiceGeneric, BasicResponseInterface } from '../service.generic'
import { CargoRepository } from 'src/repository/database/cargo/cargo.repository'
import { FeedbackRepository } from 'src/repository/database/feedback/feedback.repository'
import { UsuarioPerfilInterface } from './interface/usuario_perfil.interface'
@Injectable()
export class UsuarioService extends BaseServiceGeneric {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private feedbackRepository: FeedbackRepository,
    private cargoRepository: CargoRepository,
  ) { super() }

  async buscarUsuarioPorEmail(email_empresarial: string): Promise<BasicResponseInterface> {
    let usuario = await this.usuarioRepository.buscarUsuarioPerfilPorEmail(email_empresarial)
    if (!usuario) return this.createReturn(404, "Usuario não encontrado!")
    const cargo = await this.cargoRepository.buscaCargoPeloId(email_empresarial)
    return this.createReturn(200, await this.usuarioRepository.buscaInfoCompletaUsuarioPorId(usuario.id_usuario, cargo))
  }

  async cadastrarUsuario(usuario: UsuarioCadastroInterface): Promise<BasicResponseInterface> {
    const existeUsuario = await this.usuarioRepository.buscaUsuarioPerfilPorCpfEEmail(usuario.cpf, usuario.email_empresarial)
    if (existeUsuario) return this.createReturn(409, 'Usuário já cadastrado!')
    const cargo = await this.cargoRepository.buscaCargoPeloId(usuario.id_cargo)
    return this.createReturn(201, await this.usuarioRepository.cadastraUsuarioCompleto(usuario, cargo))
  }

  async carregarTodosUsuarios(): Promise<BasicResponseInterface> {
    let usuarios: any = await this.usuarioRepository.buscaTodosUsuarios();
    if (!usuarios) return this.createReturn(204, "Não foi encontrado registros!")
    await Promise.all(
      usuarios.map(async (item) => {
        item.cargo = await this.cargoRepository.buscaCargoPeloId(item.id_cargo)
        item.perfil = await this.usuarioRepository.buscaUsuarioPerfilPorId(item.id_usuario)
        item.pontos = await this.usuarioRepository.buscaUsuarioPontuacaoPorId(item.id_usuario)
        item.feedback = null
        item.avatar_link = (await this.getAvatar(item.id_usuario)).data
        item.banner_link = (await this.getBanner(item.id_usuario)).data
      })
    )
    return this.createReturn(200, usuarios)
  }

  async carregarTodosUsuariosAtivosNomeEmailCel(): Promise<BasicResponseInterface> {
    let usuarios: any = await this.usuarioRepository.buscaTodosUsuariosAtivosNomeEmailCel();
    if (!usuarios) return this.createReturn(204, "Não foi encontrado registros!")
    return this.createReturn(200, usuarios.filter(u => u.nome != 'admin').map(us => [us.nome, us.email, us.email_empresarial, us.contato]))
  }

  async carregaFichaUsuario(email_empresarial:string): Promise<BasicResponseInterface> {
    let usuario = await this.usuarioRepository.buscarUsuarioPerfilPorEmail(email_empresarial)
    if (!usuario) return this.createReturn(404, "Usuario não encontrado!")

    let id_cargo = await this.usuarioRepository.buscaIdCargoPorIdUsuario(usuario.id_usuario)
    const cargo = await this.cargoRepository.buscaCargoPeloId(id_cargo)
    
    const ficha_completa = await this.usuarioRepository.buscaUsuarioFicha(usuario.id_usuario, cargo)
    
    return this.createReturn(200, {
      nome: ficha_completa.perfil.nome,
      cpf: ficha_completa.perfil.cpf,
      email_empresarial: ficha_completa.perfil.email_empresarial,
      email_pessoal: ficha_completa.perfil.email,
      contato: ficha_completa.perfil.contato,
      cargo: cargo.nome,
      qtd_desafios_completos: ficha_completa.social.desafios_concluidos,
      qtd_cursos_completos: ficha_completa.social.cursos_concluidos,
      qtd_trilhas_completos: ficha_completa.social.trilhas_concluidos,
      qtd_quizzes_completos: ficha_completa.social.quizzes_concluidos,
      linkedin: ficha_completa.social.linkedin_link
    })
  }

  async carregarInfoUsuario(id_usuario: number): Promise<BasicResponseInterface> {
    const usuario: UsuarioInterface = await this.usuarioRepository.buscaUsuarioPorId(id_usuario);
    if (!usuario) return this.createReturn(404,"Usuario não encontrado!")

    const usuario_pontos: UsuarioPontuacaoInterface = await this.usuarioRepository.buscaUsuarioPontuacaoPorId(id_usuario)
    const cargo: CargoInterface = await this.cargoRepository.buscaCargoPeloId(usuario.id_cargo)

    return this.createReturn(200, {
      id_usuario: usuario.id_usuario,
      ativo_SN: usuario.ativo_SN,
      colaborador_SN: usuario.colaborador_SN,
      stamp_created: usuario.stamp_created,
      cargo: cargo.nome,
      pontos: usuario_pontos.pontos,
      social: await this.usuarioRepository.buscaUsuarioSocialPorId(id_usuario),
      perfil: await this.usuarioRepository.buscaUsuarioPerfilPorId(id_usuario),
      feedback: null,
      avatar_link: (await this.getAvatar(usuario.id_usuario)).data,
      banner_link: (await this.getBanner(usuario.id_usuario)).data,
    })
  }

  async carregarInfoUsuarioPorEmail(email_empresarial: string): Promise<BasicResponseInterface> {
    const usuario_perfil: UsuarioPerfilInterface = await this.usuarioRepository.buscaUsuarioPerfilPorEmailEmpresarial(email_empresarial);
    if (!usuario_perfil) return this.createReturn(404,"Usuario não encontrado!")

    const usuario_pontos: UsuarioPontuacaoInterface = await this.usuarioRepository.buscaUsuarioPontuacaoPorId(usuario_perfil.id_usuario)
    const usuario_principal: UsuarioInterface  = await this.usuarioRepository.buscaUsuarioPorId(usuario_perfil.id_usuario)
    const cargo: CargoInterface = await this.cargoRepository.buscaCargoPeloId(usuario_principal.id_cargo)

    return this.createReturn(200, {
      id_usuario: usuario_principal.id_usuario,
      ativo_SN: usuario_principal.ativo_SN,
      colaborador_SN: usuario_principal.colaborador_SN,
      stamp_created: usuario_principal.stamp_created,
      cargo: cargo.nome,
      pontos: usuario_pontos.pontos,
      social: await this.usuarioRepository.buscaUsuarioSocialPorId(usuario_principal.id_usuario),
      perfil: usuario_perfil,
      feedback: null,
      avatar_link: (await this.getAvatar(usuario_principal.id_usuario)).data,
      banner_link: (await this.getBanner(usuario_principal.id_usuario)).data,
    })
  }

  async carregarCargoUsuario(id_usuario: number): Promise<BasicResponseInterface> {
    const usuario: UsuarioInterface = await this.usuarioRepository.buscaUsuarioPorId(id_usuario);
    if (!usuario) return this.createReturn(404,"Usuario não encontrado!")
    return this.createReturn(200, await this.cargoRepository.buscaCargoPeloId(usuario.id_cargo))
  }

  async verificaSeCargoEstaEmUsoParaDelecao(id_cargo: number): Promise<BasicResponseInterface> {
    const usuario: UsuarioInterface = await this.usuarioRepository.buscaUsuarioPorCargoId(id_cargo);
    if (usuario) return this.createReturn(400,"Cargo esta sendo utilizado!")
    else return this.createReturn(200,"Cargo pode ser deletado")
  }

  async carregarInfoSocial(id_usuario: number): Promise<BasicResponseInterface> {
    const usuario = await this.usuarioRepository.buscaUsuarioSocialPorId(id_usuario);
    if (!usuario) return this.createReturn(404, "Usuario não encontrado!")
    return this.createReturn(200, usuario)
  }

  async carregarInfoPerfil(id_usuario: number): Promise<BasicResponseInterface> {
    const usuario = await this.usuarioRepository.buscaUsuarioPerfilPorId(id_usuario);
    if (!usuario) return this.createReturn(404, "Usuario não encontrado!")
    return this.createReturn(200, usuario)
  }

  async atualizarUsuarioPerfil(id_usuario: number, data): Promise<BasicResponseInterface> {
    if (!await this.usuarioRepository.buscaUsuarioPorId(id_usuario)) return this.createReturn(404, 'Usuario não existe!');
    const usuario = await this.usuarioRepository.atualizarUsuarioPerfil(id_usuario , data);
    return this.createReturn(200,usuario)
  }

  async atualizarUsuarioCargo(id_usuario: number, id_cargo: number): Promise<BasicResponseInterface> {
    if (!await this.usuarioRepository.buscaUsuarioPorId(id_usuario)) return this.createReturn(404, 'Usuario não existe!');
    const usuario = await this.usuarioRepository.atualizarUsuarioCargo(id_usuario , id_cargo);
    return this.createReturn(200,usuario)
  }

  async atualizarUsuarioSocial(id_usuario: number, data): Promise<BasicResponseInterface> {
    if (!await this.usuarioRepository.buscaUsuarioPorId(id_usuario)) return this.createReturn(404, 'Usuario não existe!');
    const usuario = await this.usuarioRepository.atualizarUsuarioSocial(id_usuario , data);
    return this.createReturn(200,usuario)
  }

  async deletarUsuario(id_usuario: number): Promise<BasicResponseInterface> {
    if (!id_usuario) return this.createReturn(500, "Passe o parametro corretamente!");
    const res = await this.usuarioRepository.deletarUsuario(id_usuario)
    return this.createReturn(res ? 204:404, res? true: "Usuario não encontrado!")
  }

  async deletarVariosUsuario(ids: string): Promise<BasicResponseInterface> {
    if (ids == '') return this.createReturn(500, "Passe o parametro corretamente!");
    const res = await this.usuarioRepository.deletarVariosUsuario(ids)
    return this.createReturn(res ? 204:404, res? true: "Erro ao deletar usuarios!")
  }
  
  async toggleAtivoOuInativo(id_usuario: number): Promise<BasicResponseInterface> {
    const usuario = await this.usuarioRepository.buscaUsuarioPorId(id_usuario);
    if (!usuario) return this.createReturn(404, "Usuario não encontrado!");
    return this.createReturn(200, await this.usuarioRepository.toggleAtivoOuInativo(usuario))
  }

  async addAvatar(dataBuffer: Buffer, id_usuario: number): Promise<BasicResponseInterface> {
    const usuario = await this.usuarioRepository.buscaUsuarioSocialPorId(id_usuario);
    if (!usuario) return this.createReturn(404,"Usuario não encontrado!")

    const path = `usuarios/avatar/${id_usuario}/avatar.jpeg`;
    const s3 = new S3();
    await s3.upload({
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Body: dataBuffer,
      ContentType: 'image/jpeg',
      Key: path
    }).promise();
    await this.usuarioRepository.atualizarPathAvatarUsuarioSocial(path, id_usuario)
    const params = {
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Key: usuario.avatar,
      Expires: 86400 // 24hrs
    }
    return this.createReturn(201, await s3.getSignedUrl('getObject', params))
  }

  async addBanner(dataBuffer: Buffer, id_usuario: number): Promise<BasicResponseInterface> {
    const usuario = await this.usuarioRepository.buscaUsuarioSocialPorId(id_usuario);
    if (!usuario) return this.createReturn(404,"Usuario não encontrado!")
    const path = `usuarios/banner/${id_usuario}/banner.jpeg`;
    const s3 = new S3();
    await s3.upload({
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Body: dataBuffer,
      ContentType: 'image/jpeg',
      ACL: 'public-read',
      Key: path
    }).promise();
    await this.usuarioRepository.atualizarPathBannerUsuarioSocial(path, id_usuario)
    const params = {
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Key: usuario.banner,
      Expires: 86400 // 24hrs
    }
    return this.createReturn(201, await s3.getSignedUrl('getObject', params))
  }

  async deleteAvatar(id_usuario: number): Promise<BasicResponseInterface> {
    const usuario = await this.usuarioRepository.buscaUsuarioSocialPorId(id_usuario);
    if (!usuario) return this.createReturn(404,"Usuario não encontrado!")
    const s3 = new S3();
    await s3.deleteObject({
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Key: usuario.avatar,
    }).promise();
    await this.usuarioRepository.atualizarPathAvatarUsuarioSocial('usuarios/avatar/default.jpg', id_usuario)
    return this.createReturn(204,true)
  }

  async deleteBanner(id_usuario: number): Promise<BasicResponseInterface> {
    const usuario = await this.usuarioRepository.buscaUsuarioSocialPorId(id_usuario);
    if (!usuario) return this.createReturn(404,"Usuario não encontrado!")
    const s3 = new S3();
    await s3.deleteObject({
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Key: usuario.avatar,
    }).promise();
    await this.usuarioRepository.atualizarPathBannerUsuarioSocial('usuarios/banner/default.jpg', id_usuario)
    return this.createReturn(204,true)
  }

  async getAvatar(id_usuario: number): Promise<BasicResponseInterface> {
    const usuario = await this.usuarioRepository.buscaUsuarioSocialPorId(id_usuario);
    if (!usuario) return this.createReturn(404,"Usuario não encontrado!")

    const s3 = new S3();
    var params = {
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Key: usuario.avatar,
      Expires: 86400 // 24hrs
    };

    return this.createReturn(200,s3.getSignedUrl('getObject', params))
  }

  async getBanner(id_usuario: number): Promise<BasicResponseInterface> {
    const usuario = await this.usuarioRepository.buscaUsuarioSocialPorId(id_usuario);
    if (!usuario) return this.createReturn(404,"Usuario não encontrado!")

    const s3 = new S3();
    var params = {
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Key: usuario.banner,
      Expires: 86400 // 24hrs
    };

    return this.createReturn(200,s3.getSignedUrl('getObject', params))
  }

  async seguir(id_seguidor, id_seguido): Promise<BasicResponseInterface> {
    await this.usuarioRepository.seguir(id_seguidor, id_seguido)  
    return this.createReturn(200, 'OK')
  }

  async deixarDeSeguir(id_seguidor, id_seguido): Promise<BasicResponseInterface> {
    await this.usuarioRepository.deixarDeSeguir(id_seguidor, id_seguido)  
    return this.createReturn(200, 'OK')
  }

  async listarSeguidores(id): Promise<BasicResponseInterface> {
    const ids_seguidores = (await this.usuarioRepository.listarIdsSeguidores(id)).map(usuario => usuario.seguidor)  
    const seguidores = await this.usuarioRepository.buscaInfoSocialPorIds(ids_seguidores)
    const retorno = []
    for(let usuario of seguidores) {
      retorno.push({
        avatar: (await this.getAvatar(usuario.id_usuario)).data,
        nome: await this.usuarioRepository.buscaNomePerfilPorIdUsuario(usuario.id_usuario)
      })
    }

    return this.createReturn(200,retorno)
  }

  async listarQuemSigo(id): Promise<BasicResponseInterface> {
    const ids_seguindo = (await this.usuarioRepository.listarIdsQuemSigo(id)).map(usuario => usuario.seguido)  
    const seguindo = await this.usuarioRepository.buscaInfoSocialPorIds(ids_seguindo)
    const retorno = []
    for(let usuario of seguindo) {
      retorno.push({
        avatar: (await this.getAvatar(usuario.id_usuario)).data,
        nome: await this.usuarioRepository.buscaNomePerfilPorIdUsuario(usuario.id_usuario)
      })
    }

    return this.createReturn(200, retorno)
  }

  async quantosSeguindoESeguidores(id_usuario_social) : Promise<BasicResponseInterface> {
    return this.createReturn(200, 
      await this.usuarioRepository.buscaQtdSeguindoESeguidores(id_usuario_social)
    )
  }

  async concluirDesafio(data): Promise<BasicResponseInterface> {  
    await this.usuarioRepository.concluirDesafio(data)
    return this.createReturn(200, 'OK')
  }
  
  async concluirQuiz(data): Promise<BasicResponseInterface> {  
    await this.usuarioRepository.concluirQuiz(data)
    return this.createReturn(200, 'OK')
  }
  
  async concluirTrilha(data): Promise<BasicResponseInterface> {  
    await this.usuarioRepository.concluirTrilha(data)
    return this.createReturn(200, 'OK')
  }

  async concluirCurso(data): Promise<BasicResponseInterface> {  
    await this.usuarioRepository.concluirCurso(data)
    return this.createReturn(200, 'OK')
  }

  async carregarTrilhasUsuario(id_usuario): Promise<BasicResponseInterface> {  
    return this.createReturn(200, await this.usuarioRepository.carregarTrilhasUsuario(id_usuario))
  }

  async carregarCursosUsuario(id_usuario): Promise<BasicResponseInterface> {  
    return this.createReturn(200, await this.usuarioRepository.carregarCursosUsuario(id_usuario))
  }

  async concluirBlogLeitura(data): Promise<BasicResponseInterface> {  
    await this.usuarioRepository.concluirBlogLeitura(data)
    return this.createReturn(200, 'OK')
  }

  async enviarDesafioFeedbackNota(data): Promise<BasicResponseInterface> {
    await this.feedbackRepository.enviarDesafioFeedbackNota(data)
    await this.usuarioRepository.feedbackDesafioEnviado(data.id_desafio)
    return this.createReturn(200, 'OK')
  }

  async alterarSenha(data): Promise<BasicResponseInterface> {
    const { email, senha_nova, senha_atual } = data
    let usuario = await this.usuarioRepository.buscarInfoLoginPorEmail(email);
    if(senha_nova == senha_atual || !bcrypt.compareSync(senha_atual.toString(), usuario.senha)) return this.createReturn(400, 'Senha invalida')
    await this.usuarioRepository.atualizarSenhaUsuario(usuario.id_usuario, senha_nova.toString())
    return this.createReturn(200, 'Senha atualizada')
  }

  async alterarSenhaNova(data): Promise<BasicResponseInterface> {
    const { email, senha_nova } = data
    let usuario = await this.usuarioRepository.buscarInfoLoginPorEmail(email);
    await this.usuarioRepository.atualizarSenhaUsuario(usuario.id_usuario, senha_nova.toString())
    return this.createReturn(200, 'Senha atualizada')
  }

  async carregarDesafiosEnviadosComFeedbacks(): Promise<BasicResponseInterface>{
    let desafiosEnviados: any = await this.usuarioRepository.carregarDesafiosEnviados()
    const feedbacks = await this.feedbackRepository.carregarFeedbackDesafiosEnviados()
    const retorno = []
    for (const desafio of desafiosEnviados) {
      retorno.push({
        ...desafio,
        usuario: await this.usuarioRepository.buscaUsuarioPerfilNomeEEmailEmpresarialPorId(desafio.id_usuario),
        feedback: feedbacks.filter(elem => elem.id_desafio ==  desafio.id_usuario_desafio_conclusao).sort((a,b)=>{
          return a.id_udc < b.id_udc ? 1 : a.id_udc > b.id_udc ? -1 : 0
        })[0]
      })
    }
    return this.createReturn(200, retorno)
  }

  async carregarDesafiosEnviadosComFeedbacksDoUsuarioId(id):Promise<BasicResponseInterface>{
    let desafiosEnviados: any = await this.usuarioRepository.carregarDesafiosEnviadosUsuarioId(id)

    //PEGO OS DESAFIOS QUE ELE ENVIOU E BUSCO OS FEEDBACKS
    const feedbacks = await this.feedbackRepository.carregarFeedbackDesafiosEnviadosUsuarioId(id)
    const retorno = []
    for (const desafio of desafiosEnviados) {
      retorno.push({
        ...desafio,
        usuario: await this.usuarioRepository.buscaUsuarioPerfilNomeEEmailEmpresarialPorId(desafio.id_usuario),
        feedback: feedbacks.filter(elem => elem.id_desafio ==  desafio.id_usuario_desafio_conclusao).sort((a,b)=>{
          return a.id_udc < b.id_udc ? 1 : a.id_udc > b.id_udc ? -1 : 0
        })[0]
      })
    }
    return this.createReturn(200, retorno)
  }

  async carregarQuizzesEnviadossDoUsuarioId(id): Promise<BasicResponseInterface>{
    const quizConcluidos = await this.usuarioRepository.carregarQuizzesEnviadosDoUsuarioId(id)
    const retorno = []
    for (const quiz of quizConcluidos) {
      retorno.push({
        ...quiz,
        perguntas: await this.usuarioRepository.caregarQuizPerguntasPorId(quiz.id_usuario_quiz_conclusao),
        respostaS: await this.usuarioRepository.caregarQuizRespostasPorId(quiz.id_usuario_quiz_conclusao) 
      })
    }
    return this.createReturn(200, retorno)
  }

  async carregarRanqueamentoUsuarios(): Promise<BasicResponseInterface> {
    let retorno = []
    //Baseado na quantidade de desafios/quizzes/cursos enviados eu monto um rank dos usuarios
    retorno = (await this.usuarioRepository.carregarRanqueamentoUsuarios()).map(usu => ({
      ...usu,
      total: parseInt(usu.quiz) + parseInt(usu.desafio) + parseInt(usu.trilha) + parseInt(usu.curso)
    })).sort((a, b) => {
      if (a.total > b.total) return -1
      else if (a.total < b.total) return 1
      else return 0
    })
    return this.createReturn(200, retorno)
  }
  async carregarNotasDesafiosUsuarios(): Promise<BasicResponseInterface> {
    let retorno = []
    //carregar os Desafios e embaixo o ultimo envio dos usuarios e suas notas
    retorno = await this.usuarioRepository.carregarNotasDesafiosUsuarios()
    return this.createReturn(200, retorno)
  }
  async carregarQtdConclusaoCursos(): Promise<BasicResponseInterface> {
    //Trago todos os cursos e a qtde que eles foram concluidos
    return this.createReturn(200, await this.usuarioRepository.carregarQtdConclusaoCursos())
  }
  async carregarQtdConclusaoQuizzes(): Promise<BasicResponseInterface> {
    //Trago todos os quizzes e a qtde que eles foram concluidos
    return this.createReturn(200, await this.usuarioRepository.carregarQtdConclusaoQuizzes())
  }
  async carregarQtdConclusaoDesafios(): Promise<BasicResponseInterface> {
    //Trago todos os desafios e a qtde que eles foram concluidos
    return this.createReturn(200, await this.usuarioRepository.carregarQtdConclusaoDesafios())
  }
}

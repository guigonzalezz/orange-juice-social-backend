import { Injectable } from '@nestjs/common';
import { Repository, getConnection, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'

//entidades
import { UsuarioV2 } from 'src/repository/database/usuario/entidades/usuario.entity';
import { UsuarioPerfil } from 'src/repository/database/usuario/entidades/usuario_perfil.entity';
import { UsuarioPontuacao } from 'src/repository/database/usuario/entidades/usuario_pontuacao.entity';
import { UsuarioSocial } from 'src/repository/database/usuario/entidades/usuario_social.entity';
import { UsuarioFollow } from './entidades/usuario_follow.entity';
import { UsuarioTrilhaConclusao } from './entidades/usuario_trilha_conclusao.entity';
import { UsuarioQuizConclusao } from './entidades/usuario_quiz_conclusao.entity';
import { UsuarioDesafioConclusao } from './entidades/usuario_desafio_conclusao.entity';
import { UsuarioCursoConclusao } from './entidades/usuario_curso_conclusao.entity';
import { UsuarioBlogLeitura } from './entidades/usuario_blog_leitura.entity';
import { UsuarioQuizResposta } from './entidades/usuario_quiz_respostas.entity';
import { UsuarioQuizPergunta } from './entidades/usuario_quiz_pergunta.entity';
@Injectable()
export class UsuarioRepository {
  constructor(
    @InjectRepository(UsuarioPerfil)
    private usuarioPerfilRepository: Repository<UsuarioPerfil>,
    @InjectRepository(UsuarioV2)
    private usuarioRepository: Repository<UsuarioV2>,
    @InjectRepository(UsuarioSocial)
    private usuarioSocialRepository: Repository<UsuarioSocial>,
    @InjectRepository(UsuarioPontuacao)
    private usuarioPontuacaoRepository: Repository<UsuarioPontuacao>,
    @InjectRepository(UsuarioFollow)
    private usuarioFollowRepository: Repository<UsuarioFollow>,
    @InjectRepository(UsuarioTrilhaConclusao)
    private usuarioTrilhaConclusaoRepository: Repository<UsuarioTrilhaConclusao>,
    @InjectRepository(UsuarioQuizConclusao)
    private usuarioQuizConclusaoRepository: Repository<UsuarioQuizConclusao>,
    @InjectRepository(UsuarioDesafioConclusao)
    private usuarioDesafioConclusaoRepository: Repository<UsuarioDesafioConclusao>,
    @InjectRepository(UsuarioCursoConclusao)
    private usuarioCursoConclusaoRepository: Repository<UsuarioCursoConclusao>,
    @InjectRepository(UsuarioBlogLeitura)
    private usuarioBlogLeituraRepository: Repository<UsuarioBlogLeitura>,
    @InjectRepository(UsuarioQuizResposta)
    private usuarioQuizRespostaRepository: Repository<UsuarioQuizResposta>,
    @InjectRepository(UsuarioQuizPergunta)
    private usuarioQuizPerguntaRepository: Repository<UsuarioQuizPergunta>
  ) { }

  async buscarInfoLoginPorEmail(email_empresarial: string): Promise<UsuarioPerfil> {
    return await this.usuarioPerfilRepository.findOne({ where:{email_empresarial}, select: ['id_usuario', 'email_empresarial', 'senha']});
  }

  async buscarUsuarioPerfilPorEmail(email_empresarial: string): Promise<UsuarioPerfil> {
    return await this.usuarioPerfilRepository.findOne({ where:{email_empresarial} });
  }

  async buscaUsuarioPerfilPorCpfEEmail(cpf, email_empresarial): Promise<UsuarioPerfil> {
    return await this.usuarioPerfilRepository.findOne({ where:{cpf, email_empresarial}});
  }

  async buscaIdCargoPorIdUsuario(id_usuario: number): Promise<number>{
    return (await this.usuarioRepository.findOne({ where:{ id_usuario}, select: ['id_cargo']})).id_cargo
  }
  
  async buscaTodosUsuariosAtivosNomeEmailCel() {
    return this.usuarioPerfilRepository.find({select:['nome', 'email', 'email_empresarial', 'contato']})
  }

  async buscaInfoCompletaUsuarioPorId(id_usuario,cargo) {
    const usuario = await this.usuarioRepository.findOne({ id_usuario});
    const usuario_pontos = await this.usuarioPontuacaoRepository.findOne({ id_usuario });
    return {
      id_usuario: usuario.id_usuario,
      ativo_SN: usuario.ativo_SN,
      colaborador_SN: usuario.colaborador_SN,
      stamp_created: usuario.stamp_created,
      cargo: cargo.nome,
      pontos: usuario_pontos.pontos,
      social: await this.usuarioSocialRepository.findOne({ id_usuario }),
      perfil: await this.usuarioPerfilRepository.findOne({select: ["id_usuario_perfil", "nome", "email", "email_empresarial", "senha", "data_nasc", "contato", "cpf", "cidade", "estado", "pais", "id_usuario"], where:{ id_usuario }}),
      feedback: null,
    }
  }

  async buscaUsuarioPorId(id_usuario) {
    return await this.usuarioRepository.findOne({id_usuario})
  }

  async buscaUsuarioPorCargoId(id_cargo) {
    return await this.usuarioRepository.findOne({id_cargo})
  }

  async buscaUsuarioSocialPorId(id_usuario) {
    return await this.usuarioSocialRepository.findOne({id_usuario})
  }
  
  async buscaUsuarioPerfilPorId(id_usuario) {
    return await this.usuarioPerfilRepository.findOne({id_usuario})
  }

  async buscaUsuarioPerfilPorEmailEmpresarial(email_empresarial) {
    return await this.usuarioPerfilRepository.findOne({email_empresarial})
  }

  async buscaUsuarioPerfilNomeEEmailEmpresarialPorId(id_usuario) {
    return await this.usuarioPerfilRepository.findOne({where:{id_usuario}, select:['nome','email_empresarial']})
  }

  async buscaUsuarioPontuacaoPorId(id_usuario) {
    return await this.usuarioPontuacaoRepository.findOne({id_usuario})
  }

  async atualizarSenhaUsuario(id_usuario, senha_nova) {
    const salt = await bcrypt.genSalt();
    const senhaCriptografada = await bcrypt.hash(senha_nova, salt);
    await this.usuarioPerfilRepository.update({id_usuario},{senha: senhaCriptografada})
  }

  async cadastraUsuarioCompleto(usuario, cargo) {
    const existUsuario = await this.usuarioPerfilRepository.findOne({ where: [{ cpf: usuario.cpf }, {email_empresarial: usuario.email_empresarial}]});
    if (existUsuario) return { code: 409, error: 'Usuário já cadastrado!' }
    const usuario_general: UsuarioV2 = await this.usuarioRepository.save({
      ativo_SN: 'S',
      colaborador_SN: 'S',
      stamp_created: new Date(),
      stamp_disable: null,
      id_cargo: cargo.id_cargo
    })

    const usuario_perfil: UsuarioPerfil =  UsuarioPerfil.create({
      nome: usuario.nome,
      email: usuario.email,
      email_empresarial: usuario.email_empresarial,
      cpf: usuario.cpf,
      data_nasc: new Date(usuario.data_nasc),
      contato: usuario.contato,
      cidade: usuario.cidade,
      estado: usuario.estado,
      pais: usuario.pais,
      senha: usuario.cpf,//Primeira senha será o cpf dele
      id_usuario: usuario_general.id_usuario
    })
    await usuario_perfil.save()

    const usuario_social: UsuarioSocial = await this.usuarioSocialRepository.save({
      avatar: 'usuarios/avatar/default.jpg',
      banner: 'usuarios/banner/default.png',
      id_usuario: usuario_general.id_usuario
    })

    const usuario_pontos: UsuarioPontuacao = await this.usuarioPontuacaoRepository.save({
      id_usuario: usuario_general.id_usuario,
      pontos: 0
    })

    return {
      ...usuario_general,
      cargo,
      perfil: usuario_perfil,
      social: usuario_social,
      pontos: usuario_pontos
    }
    //if (usuarioSalvo) // envia email
    //https://notiz.dev/blog/send-emails-with-nestjs
  }

  async buscaTodosUsuarios() {
    return await this.usuarioRepository.find();
  }

  async atualizarUsuarioPerfil(id_usuario: number, data) {
    await this.usuarioPerfilRepository.update({ id_usuario }, data);
    return await this.usuarioPerfilRepository.findOne({ id_usuario })
  }

  async atualizarUsuarioCargo(id_usuario: number, id_cargo: number) {
    await this.usuarioRepository.update({ id_usuario }, { id_cargo });
    return await this.usuarioRepository.findOne({ id_usuario })
  }

  async atualizarUsuarioSocial(id_usuario: number, data) {
    await this.usuarioSocialRepository.update({ id_usuario }, data);
    return await this.usuarioSocialRepository.findOne({ id_usuario })
  }

  async deletarUsuario(id_usuario: number) {
    if (await this.usuarioRepository.findOne({ id_usuario })) {
      await this.usuarioSocialRepository.delete({ id_usuario })
      await this.usuarioPerfilRepository.delete({ id_usuario })
      await this.usuarioPontuacaoRepository.delete({ id_usuario })
      await this.usuarioRepository.delete({ id_usuario })
      return true
    } else {
      return false
    }
  }
  
  async deletarVariosUsuario(ids: string) {
    const ids_array = ids.split(",")
    ids_array.map(async id => {
      await this.usuarioSocialRepository.delete({ id_usuario: parseInt(id) })
      await this.usuarioPerfilRepository.delete({ id_usuario: parseInt(id) })
      await this.usuarioPontuacaoRepository.delete({ id_usuario: parseInt(id) })
      await this.usuarioRepository.delete({ id_usuario: parseInt(id) })
    })
    return true
  }

  async toggleAtivoOuInativo(usuario) {
    await getConnection()
      .createQueryBuilder()
      .update(UsuarioV2)
      .set({ ativo_SN: usuario.ativo_SN == 'S' ? 'N' : 'S' })
      .where("id_usuario = :id", { id: usuario.id_usuario })
      .execute();

    return true
  }

  async atualizarPathAvatarUsuarioSocial(path, id_usuario) {
    await getConnection()
      .createQueryBuilder()
      .update(UsuarioSocial)
      .set({ avatar: path })
      .where("id_usuario = :id", { id: id_usuario })
      .execute();
  }

  async atualizarPathBannerUsuarioSocial(path, id_usuario) {
    await getConnection()
      .createQueryBuilder()
      .update(UsuarioSocial)
      .set({ banner: path })
      .where("id_usuario = :id", { id: id_usuario })
      .execute();
  }

  async seguir(id_seguidor, id_seguido){
    const jaSeguiu = await this.usuarioFollowRepository.findOne({ where:{ seguido: id_seguido, seguidor: id_seguidor}})
    if(!jaSeguiu) {
      await this.usuarioFollowRepository.save({
        seguido: id_seguido,
        seguidor: id_seguidor
      })  
      //seguindo
      let qtd_seguindo = (await this.usuarioSocialRepository.findOne({select:['seguindo'],where:{id_usuario_social: id_seguidor}})).seguindo
      await this.usuarioSocialRepository.update({id_usuario_social: id_seguidor},{seguindo: qtd_seguindo + 1})
      //seguidores
      let qtd_seguidores = (await this.usuarioSocialRepository.findOne({select:['seguidores'],where:{id_usuario_social: id_seguido}})).seguidores
      await this.usuarioSocialRepository.update({id_usuario_social: id_seguido},{seguidores: qtd_seguidores + 1})
    }
  }

  async deixarDeSeguir(id_seguidor, id_seguido){
    const segue = await this.usuarioFollowRepository.findOne({ where:{ seguido: id_seguido, seguidor: id_seguidor}})
    if(segue) {
      await this.usuarioFollowRepository.delete({
        seguido: id_seguido,
        seguidor: id_seguidor
      })  
      //seguindo
      let qtd_seguindo = (await this.usuarioSocialRepository.findOne({select:['seguindo'],where:{id_usuario_social: id_seguidor}})).seguindo
      await this.usuarioSocialRepository.update({id_usuario_social: id_seguidor},{seguindo: qtd_seguindo - 1})
      //seguidores
      let qtd_seguidores = (await this.usuarioSocialRepository.findOne({select:['seguidores'],where:{id_usuario_social: id_seguido}})).seguidores
      await this.usuarioSocialRepository.update({id_usuario_social: id_seguido},{seguidores: qtd_seguidores - 1})
    }
  }

  async listarIdsSeguidores(id_usuario_social) {
    return await this.usuarioFollowRepository.find({select:['seguidor'], where: {seguido: id_usuario_social}})
  }

  async listarIdsQuemSigo(id_usuario_social) {
    return await this.usuarioFollowRepository.find({select:['seguido'], where: {seguidor: id_usuario_social}})
  }

  async buscaInfoSocialPorIds(ids) {
    return await this.usuarioSocialRepository.find({select:['avatar', 'id_usuario'], where:{ id_usuario_social: In(ids)} })
  }

  async buscaNomePerfilPorIdUsuario(id) {
    return (await this.usuarioPerfilRepository.findOne({select:['nome'], where:{id_usuario: id}})).nome
  }

  async buscaQtdSeguindoESeguidores(id_usuario_social) {
    return await this.usuarioSocialRepository.findOne({select:['seguidores', 'seguindo'], where:{id_usuario_social}})
  }

  async concluirDesafio(data) {
    const concluido = await this.usuarioDesafioConclusaoRepository.findOne({ where: { desafio_nome: data.desafio_nome, id_usuario: data.id_usuario}})

    if(concluido) {
      await this.usuarioDesafioConclusaoRepository.update({id_usuario_desafio_conclusao: concluido.id_usuario_desafio_conclusao},{ 
        desafio_url: data.desafio_url,
        anotacao: data.anotacao,
        stamp_enviado: new Date(),
        feedback_recebido_SN: 'N'
      })
    } else if(!concluido) {
      await this.usuarioDesafioConclusaoRepository.save({
        id_usuario: data.id_usuario,
        desafio_nome: data.desafio_nome, 
        desafio_url: data.desafio_url,
        anotacao: data.anotacao,
        categoria: data.categoria,
        stamp_enviado: new Date(),
        feedback_recebido_SN: 'N'
      })
      await getConnection().createQueryBuilder()
        .update(UsuarioSocial)
        .set({ desafios_concluidos: () => "desafios_concluidos + 1" })
        .where("id_usuario = :id", { id: data.id_usuario })
        .execute();
    }
  }

  async concluirTrilha(data) {
    const concluido = await this.usuarioTrilhaConclusaoRepository.findOne({ where: { trilha_nome: data.nome, id_usuario: data.id_usuario}})

    if(concluido) {
      await this.usuarioTrilhaConclusaoRepository.update({
        id_usuario_trilha_conclusao: concluido.id_usuario_trilha_conclusao
      },{ 
        concluido_SN: concluido.concluido_SN == 'N' ? 'S' : 'N', 
        anotacao: concluido.anotacao != data.anotacao ? data.anotacao : concluido.anotacao
      })
    } else if(!concluido) {
      await this.usuarioTrilhaConclusaoRepository.save({
        id_usuario: data.id_usuario,
        trilha_nome: data.nome, 
        concluido_SN: 'S',
        anotacao: data.anotacao
      })
      await getConnection().createQueryBuilder()
        .update(UsuarioSocial)
        .set({ trilhas_concluidos: () => "trilhas_concluidos + 1" })
        .where("id_usuario = :id", { id: data.id_usuario })
        .execute();
    }
  }

  async concluirCurso(data) {
    const concluido = await this.usuarioCursoConclusaoRepository.findOne({ where: { curso_nome: data.nome, id_usuario: data.id_usuario}})

    if(concluido) {
      await this.usuarioCursoConclusaoRepository.update({
        id_usuario_curso_conclusao: concluido.id_usuario_curso_conclusao
      },{ 
        concluido_SN: concluido.concluido_SN == 'N' ? 'S' : 'N', 
        anotacao: concluido.anotacao != data.anotacao ? data.anotacao : concluido.anotacao 
      })
    } else if(!concluido) {
      await this.usuarioCursoConclusaoRepository.save({
        id_usuario: data.id_usuario,
        curso_nome: data.nome, 
        concluido_SN: 'S',
        anotacao: data.anotacao
      })

      await getConnection().createQueryBuilder()
        .update(UsuarioSocial)
        .set({ cursos_concluidos: () => "cursos_concluidos + 1" })
        .where("id_usuario = :id", { id: data.id_usuario })
        .execute();
    }
  }

  async concluirQuiz(data) {
    const concluido = await this.usuarioQuizConclusaoRepository.findOne({ where: { quiz_nome: data.quiz_nome, id_usuario: data.id_usuario}})
    if(!concluido) {
      await getConnection().createQueryBuilder()
        .update(UsuarioSocial)
        .set({ quizzes_concluidos: () => "quizzes_concluidos + 1" })
        .where("id_usuario = :id", { id: data.id_usuario })
        .execute();
    }

    const quizSalvo = await this.usuarioQuizConclusaoRepository.save({
      id_usuario: data.id_usuario,
      quiz_nome: data.quiz_nome, 
      tempo_realizado: data.tempo_realizado,
      anotacao: data.anotacao,
      nota: data.nota
    })

    data.questoes.map(async questao => {
      const quizPergunta = await this.usuarioQuizPerguntaRepository.save({
        id_usuario_quiz_conclusao: quizSalvo.id_usuario_quiz_conclusao,
        pergunta: questao.pergunta,
        acertou: questao.acertou
      })
      await this.usuarioQuizRespostaRepository.save({
        id_usuario_quiz_conclusao: quizSalvo.id_usuario_quiz_conclusao,
        id_usuario_quiz_pergunta: quizPergunta.id_usuario_quiz_pergunta,
        resposta: questao.resposta
      })
    })

  }

  async concluirBlogLeitura(data) {
    const concluido = await this.usuarioBlogLeituraRepository.findOne({ where: { id_blog: data.id_blog, id_usuario: data.id_usuario}})

    if(concluido) {
      await this.usuarioBlogLeituraRepository.update({id_usuario_blog_leitura: concluido.id_usuario_blog_leitura},{ concluido_SN: concluido.concluido_SN == 'N' ? 'S' : 'N'})
    } else if(!concluido) {
      await this.usuarioBlogLeituraRepository.save({
        id_usuario: data.id_usuario,
        id_blog: data.id_blog, 
        concluido_SN: 'S',
        anotacao: data.anotacao
      })
    }
  }

  async carregarDesafiosEnviados(){
    return await this.usuarioDesafioConclusaoRepository.find()
  }

  async carregarDesafiosEnviadosUsuarioId(id_usuario){
    return await this.usuarioDesafioConclusaoRepository.find({id_usuario})
  }

  async carregarQuizzesEnviados(){
    return await this.usuarioQuizConclusaoRepository.find()
  }

  async carregarQuizzesEnviadosDoUsuarioId(id_usuario) {
    return await this.usuarioQuizConclusaoRepository.find({id_usuario})
  }
  
  async caregarQuizPerguntasPorId(id_usuario_quiz_conclusao) {
    return await this.usuarioQuizPerguntaRepository.find({id_usuario_quiz_conclusao})
  }

  async caregarQuizRespostasPorId(id_usuario_quiz_conclusao) {
    return await this.usuarioQuizRespostaRepository.find({id_usuario_quiz_conclusao})
  }

  async carregarCursosUsuario(id_usuario){
    return await this.usuarioCursoConclusaoRepository.find({id_usuario}) 
  }

  async carregarTrilhasUsuario(id_usuario){
    return await this.usuarioTrilhaConclusaoRepository.find({id_usuario})
  }

  async feedbackDesafioEnviado(id_usuario_desafio_conclusao) {
    return await this.usuarioDesafioConclusaoRepository.update({id_usuario_desafio_conclusao},{feedback_recebido_SN:'S'})
  }
  
}
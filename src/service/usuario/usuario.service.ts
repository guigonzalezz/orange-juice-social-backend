import { Injectable } from '@nestjs/common'
import { CargoInterface } from '../cargo/interface/cargo.interface'
import { UsuarioInterface } from './interface/usuario.interface'
import { UsuarioCadastroInterface } from './interface/usuario_cadastro.interface'
import { UsuarioPontuacaoInterface } from './interface/usuario_pontuacao.interface'
import { S3 } from 'aws-sdk'
import { UsuarioRepository } from 'src/repository/database/usuario/usuario.repository'
import { BaseServiceGeneric, BasicResponseInterface } from '../service.generic'
import { CargoRepository } from 'src/repository/database/cargo/cargo.repository'
@Injectable()
export class UsuarioService extends BaseServiceGeneric {
  constructor(
    private usuarioRepository: UsuarioRepository,
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
      })
    )
    return this.createReturn(200, usuarios)
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
      social: await this.usuarioRepository.buscaUsuarioSocialPorId({ id_usuario }),
      perfil: await this.usuarioRepository.buscaUsuarioPerfilPorId(id_usuario),
      feedback: null,
    })
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

}
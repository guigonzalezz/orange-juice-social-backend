import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/repository/database/usuario/entidades/usuario.entity';
import { UsuarioPerfil } from 'src/repository/database/usuario/entidades/usuario_perfil.entity';
import { UsuarioPontuacao } from 'src/repository/database/usuario/entidades/usuario_pontuacao.entity';
import { UsuarioSocial } from 'src/repository/database/usuario/entidades/usuario_social.entity';
import { Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CargoRepository } from '../cargo/cargo.repository';
@Injectable()
export class UsuarioRepository {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(UsuarioPerfil)
    private usuarioPerfilRepository: Repository<UsuarioPerfil>,
    @InjectRepository(UsuarioSocial)
    private usuarioSocialRepository: Repository<UsuarioSocial>,
    @InjectRepository(UsuarioPontuacao)
    private usuarioPontuacaoRepository: Repository<UsuarioPontuacao>,
    private readonly cargoRepository: CargoRepository,
  ) { }

  async buscarUsuarioPerfilPorEmail(email_empresarial: string): Promise<UsuarioPerfil> {
    return await this.usuarioPerfilRepository.findOne({ email_empresarial });
  }

  async buscaUsuarioPerfilPorCpfEEmail(cpf, email_empresarial): Promise<UsuarioPerfil> {
    return await this.usuarioPerfilRepository.findOne({ where:{cpf, email_empresarial}});
  }

  async buscaInfoCompletaUsuarioPorId(id_usuario) {
    const usuario = await this.usuarioRepository.findOne({ id_usuario});
    const usuario_pontos = await this.usuarioPontuacaoRepository.findOne({ id_usuario });
    const cargo = await this.cargoRepository.buscaCargoPeloId(usuario.id_cargo)

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

  async buscaUsuarioSocialPorId(id_usuario) {
    return await this.usuarioSocialRepository.findOne({id_usuario})
  }
  
  async buscaUsuarioPerfilPorId(id_usuario) {
    return await this.usuarioPerfilRepository.findOne({id_usuario})
  }

  async buscaUsuarioPontuacaoPorId(id_usuario) {
    return await this.usuarioPontuacaoRepository.findOne({id_usuario})
  }

  async cadastraUsuarioCompleto(usuario) {

  }

  async cadastrarUsuario(usuario) {
    const existUsuario = await this.usuarioPerfilRepository.findOne({ where: [{ cpf: usuario.cpf }, {email_empresarial: usuario.email_empresarial}]});
    if (existUsuario) return { code: 409, error: 'Usuário já cadastrado!' }
    const usuario_general: Usuario = await this.usuarioRepository.save({
      ativo_SN: 'S',
      colaborador_SN: 'S',
      stamp_created: new Date(),
      stamp_disable: null,
      id_cargo: usuario.id_cargo
    })

    const usuario_perfil: UsuarioPerfil = await this.usuarioPerfilRepository.save({
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

    const usuario_social: UsuarioSocial = await this.usuarioSocialRepository.save({
      avatar: 'usuarios/avatar/default.jpg',
      banner: 'usuarios/banner/default.png',
      id_usuario: usuario_general.id_usuario
    })

    const usuario_pontos: UsuarioPontuacao = await this.usuarioPontuacaoRepository.save({
      id_usuario: usuario_general.id_usuario,
      pontos: 0
    })

    let cargo = await this.cargoRepository.buscaCargoPeloId(usuario.id_cargo)
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
  
  async toggleAtivoOuInativo(usuario) {
    await getConnection()
      .createQueryBuilder()
      .update(Usuario)
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


}
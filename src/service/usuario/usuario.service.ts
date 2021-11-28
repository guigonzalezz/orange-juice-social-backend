import { Injectable, Inject } from '@nestjs/common';
import { Usuario } from 'src/repository/database/usuario/entidades/usuario.entity';
import { UsuarioPerfil } from 'src/repository/database/usuario/entidades/usuario_perfil.entity';
import { UsuarioPontuacao } from 'src/repository/database/usuario/entidades/usuario_pontuacao.entity';
import { UsuarioSocial } from 'src/repository/database/usuario/entidades/usuario_social.entity';
import { Repository, getConnection } from 'typeorm';
import { CargoDto } from '../cargo/dto/cargo.dto';
import { UsuarioDto } from './dto/usuario.dto';
import { UsuarioCadastroDto } from './dto/usuario_cadastro.dto';
import { UsuarioPontuacaoDto } from './dto/usuario_pontuacao.dto';
import { S3 } from 'aws-sdk';
import { ContentfulClientApi } from 'contentful'
import * as crypto from 'crypto';
import { CargoService } from '../cargo/cargo.service';
@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<any>,
    @Inject('USUARIO_PERFIL_REPOSITORY')
    private usuarioPerfilRepository: Repository<any>,
    @Inject('USUARIO_SOCIAL_REPOSITORY')
    private usuarioSocialRepository: Repository<any>,
    @Inject('USUARIO_PONTUACAO_REPOSITORY')
    private usuarioPontuacaoRepository: Repository<any>,
    @Inject('CONTENTFUL_CONNECTION')
    private contentfulClient: ContentfulClientApi,
    private cargoService: CargoService,
  ) { }

  async buscarUsuarioPorEmail(email_empresarial: string) {
    let usuario = await this.usuarioPerfilRepository.findOne({ email_empresarial });
    if (!usuario) return { code: 404, error: "Usuario não encontrado!" };
    usuario = (await this.carregarInfoUsuario(usuario.id_usuario)).data
    return { code: 200, data: usuario }
  }

  async cadastrarUsuario(usuario: UsuarioCadastroDto) {
    const existUsuario = await this.usuarioPerfilRepository.findOne({ where: [{ cpf: usuario.cpf }, {email_empresarial: usuario.email_empresarial}]});
    if (existUsuario) return { code: 409, error: 'Usuário já cadastrado!' }
    const usuario_general: Usuario = Usuario.create({
      ativo_SN: 'S',
      colaborador_SN: 'S',
      stamp_created: new Date(),
      stamp_disable: null,
      id_cargo: usuario.id_cargo
    });
    await usuario_general.save();

    const usuario_perfil: UsuarioPerfil = UsuarioPerfil.create({
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
    });
    await usuario_perfil.save();

    const usuario_social: UsuarioSocial = UsuarioSocial.create({
      avatar: 'usuarios/avatar/default.jpg',
      banner: 'usuarios/banner/default.png',
      id_usuario: usuario_general.id_usuario
    });
    await usuario_social.save();

    const usuario_pontos: UsuarioPontuacao = UsuarioPontuacao.create({
      id_usuario: usuario_general.id_usuario,
      pontos: 0
    });
    await usuario_pontos.save();

    let cargo = (await this.cargoService.findById(usuario.id_cargo)).data;
    return {
      code: 201,
      data: {
        ...usuario_general,
        cargo,
        perfil: usuario_perfil,
        social: usuario_social,
        pontos: usuario_pontos
      }
    };
    //if (usuarioSalvo) // envia email
    //https://notiz.dev/blog/send-emails-with-nestjs

  }

  /**
   * @returns Array com todos usuários para o dashboard do admin
   */
  async carregarTodosUsuarios() {
    let usuarios = await this.usuarioRepository.find();
    if (!usuarios) return { code: 204, data: "Não foi encontrado registros!" }
    await Promise.all(
      usuarios.map(async (item) => {
        item.cargo = (await this.cargoService.findById(item.id_cargo)).data;
        item.perfil = await this.usuarioPerfilRepository.findOne({ id_usuario: item.id_usuario });
        item.pontos = await this.usuarioPontuacaoRepository.findOne({ id_usuario: item.id_usuario });
      })
    )
    return {
      code: 200,
      data: usuarios
    };
  }

  /**
   * Fazer:
   * - criar função que traz feedbacks e utilizar
   *
   * @param id_usuario
   * @returns Usuario e todas suas informações
   */
  async carregarInfoUsuario(id_usuario: number) {
    const usuario: UsuarioDto = await this.usuarioRepository.findOne(id_usuario);
    if (!usuario) return { code: 404, error: "Usuario não encontrado!" };

    const usuario_pontos: UsuarioPontuacaoDto = await this.usuarioPontuacaoRepository.findOne({ id_usuario });
    const cargo: CargoDto = (await this.cargoService.findById(usuario.id_cargo)).data;

    return {
      code: 200,
      data: {
        id_usuario: usuario.id_usuario,
        ativo_SN: usuario.ativo_SN,
        colaborador_SN: usuario.colaborador_SN,
        stamp_created: usuario.stamp_created,
        cargo: cargo.nome,
        pontos: usuario_pontos.pontos,
        social: await this.usuarioSocialRepository.findOne({ id_usuario }),
        perfil: await this.usuarioPerfilRepository.findOne({ id_usuario }),
        feedback: null,
      }
    }
  }

  async carregarInfoSocial(id_usuario: number) {
    const usuario = this.usuarioSocialRepository.findOne(id_usuario);
    if (!usuario) return { code: 404, error: "Usuario não encontrado!" };
    return { code: 200, data: usuario }
  }

  async carregarInfoPerfil(id_usuario: number) {
    const usuario = this.usuarioPerfilRepository.findOne(id_usuario);
    if (!usuario) return { code: 404, error: "Usuario não encontrado!" };
    return { code: 200, data: usuario }
  }

  async atualizarUsuarioPerfil(id_usuario: number, data) {
    if (!await this.usuarioRepository.findOne(id_usuario)) return { code: 404, error: 'Usuario não existe!' };
    await this.usuarioPerfilRepository.update({ id_usuario }, data);
    return { code: 200, data: await this.usuarioPerfilRepository.findOne({ id_usuario }) };
  }

  async deletarUsuario(id_usuario: number) {
    if (!id_usuario) return { code: 500, error: "Passe o parametro corretamente!" };
    if (await this.usuarioRepository.findOne({ id_usuario })) {
      await this.usuarioSocialRepository.delete({ id_usuario });
      await this.usuarioPerfilRepository.delete({ id_usuario });
      await this.usuarioPontuacaoRepository.delete({ id_usuario });
      await this.usuarioRepository.delete({ id_usuario });
      //no futuro com o uso de mais tabelas será preciso conectar outros repositórios
      return { code: 204, data: true };
    } else {
      return { code: 404, error: "Usuario não encontrado!" }
    }
  }

  async toggleAtivoOuInativo(id_usuario: number) {
    const usuario = await this.usuarioRepository.findOne(id_usuario);
    if (!usuario) return { code: 500, error: "Usuario não encontrado!" };

    await getConnection()
      .createQueryBuilder()
      .update(Usuario)
      .set({ ativo_SN: usuario.ativo_SN == 'S' ? 'N' : 'S' })
      .where("id_usuario = :id", { id: id_usuario })
      .execute();

    return { code: 200, data: true }
  }

  async addAvatar(dataBuffer: Buffer, id_usuario: number) {
    const usuario = await this.usuarioRepository.findOne(id_usuario);
    if (!usuario) return { code: 404, error: "Usuario não encontrado!" };

    const path = `usuarios/avatar/${id_usuario}/avatar.jpeg`;
    const s3 = new S3();
    await s3.upload({
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Body: dataBuffer,
      ContentType: 'image/jpeg',
      Key: path
    }).promise();

    await getConnection()
      .createQueryBuilder()
      .update(UsuarioSocial)
      .set({ avatar: path })
      .where("id_usuario = :id", { id: id_usuario })
      .execute();

    return { code: 201, data: await this.getAvatar(id_usuario) };
  }

  async addBanner(dataBuffer: Buffer, id_usuario: number) {
    const usuario = await this.usuarioRepository.findOne(id_usuario);
    if (!usuario) return { code: 404, error: "Usuario não encontrado!" };

    const path = `usuarios/banner/${id_usuario}/banner.jpeg`;
    const s3 = new S3();
    await s3.upload({
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Body: dataBuffer,
      ContentType: 'image/jpeg',
      ACL: 'public-read',
      Key: path
    }).promise();

    await getConnection()
      .createQueryBuilder()
      .update(UsuarioSocial)
      .set({ banner: path })
      .where("id_usuario = :id", { id: id_usuario })
      .execute();

    return { code: 201, data: await this.getBanner(id_usuario) };
  }

  async deleteAvatar(id_usuario: number) {
    const usuario = await this.usuarioSocialRepository.findOne({ id_usuario });
    if (!usuario) return { code: 404, error: "Usuario não encontrado!" };

    const s3 = new S3();
    await s3.deleteObject({
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Key: usuario.avatar,
    }).promise();

    await getConnection()
      .createQueryBuilder()
      .update(UsuarioSocial)
      .set({ avatar: 'usuarios/avatar/default.jpg' })
      .where("id_usuario = :id", { id: id_usuario })
      .execute();

    return { code: 204, data: true };
  }

  async deleteBanner(id_usuario: number) {
    const usuario = await this.usuarioSocialRepository.findOne({ id_usuario });
    if (!usuario) return { code: 404, error: "Usuario não encontrado!" };

    const s3 = new S3();
    await s3.deleteObject({
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Key: usuario.avatar,
    }).promise();

    await getConnection()
      .createQueryBuilder()
      .update(UsuarioSocial)
      .set({ avatar: 'usuarios/banner/default.jpg' })
      .where("id_usuario = :id", { id: id_usuario })
      .execute();

    return { code: 204, data: true };
  }

  async getAvatar(id_usuario: number) {
    const usuario = await this.usuarioSocialRepository.findOne({ id_usuario });
    if (!usuario) return { code: 404, error: "Usuario não encontrado!" };

    const s3 = new S3();
    var params = {
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Key: usuario.avatar,
      Expires: 86400 // 24hrs
    };

    return {
      code: 200,
      data: s3.getSignedUrl('getObject', params)
    }
  }

  async getBanner(id_usuario: number) {
    const usuario = await this.usuarioSocialRepository.findOne({ id_usuario });
    if (!usuario) return { code: 404, error: "Usuario não encontrado!" };

    const s3 = new S3();
    var params = {
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Key: usuario.banner,
      Expires: 86400 // 24hrs
    };

    return {
      code: 200,
      data: s3.getSignedUrl('getObject', params)
    }
  }

}
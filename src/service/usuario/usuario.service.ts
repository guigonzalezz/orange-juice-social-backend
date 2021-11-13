import { Injectable, Inject } from '@nestjs/common';
import { Usuario } from 'src/repository/database/usuario/entidades/usuario.entity';
import { UsuarioPerfil } from 'src/repository/database/usuario/entidades/usuario_perfil.entity';
import { UsuarioPontuacao } from 'src/repository/database/usuario/entidades/usuario_pontuacao.entity';
import { UsuarioSocial } from 'src/repository/database/usuario/entidades/usuario_social.entity';
import { Repository, getConnection, DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CargoDto } from '../cargo/dto/cargo.dto';
import { UsuarioDto } from './dto/usuario.dto';
import { UsuarioCadastroDto } from './dto/usuario_cadastro.dto';
import { UsuarioPerfilDto } from './dto/usuario_perfil.dto';
import { UsuarioPontuacaoDto } from './dto/usuario_pontuacao.dto';
import { UsuarioRespostaDto } from './dto/usuario_resposta.dto';
import { UsuarioSocialDto } from './dto/usuario_social.dto';
@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<any>,
    @Inject('USUARIO_PERFIL_REPOSITORY')
    private usuarioPerfilRepository: Repository<any>,
    @Inject('USUARIO_SOCIAL_REPOSITORY')
    private usuarioSocialRepository: Repository<any>,
    @Inject('USUARIO_SOCIAL_REPOSITORY')
    private usuarioPontuacaoRepository: Repository<any>,
    @Inject('CARGO_REPOSITORY')
    private cargoRepository: Repository<any>
  ) { }

  async cadastrarUsuario(usuario: UsuarioCadastroDto) {//Promise<UsuarioRespostaDto> {
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

    return {
      general: usuario_general,
      perfil: usuario_perfil,
      social: usuario_social,
      pontuacao: usuario_pontos
    };
    //if (usuarioSalvo) // envia email
    //https://notiz.dev/blog/send-emails-with-nestjs

  }

  /**
   * @returns Array com todos usuários para o dashboard do admin
   */
  async carregarTodosUsuarios(): Promise<UsuarioRespostaDto[]> {
    let retorno = [];
    let usuarios: UsuarioDto[] = await this.usuarioRepository.find();
    await Promise.all(
      usuarios.map(async (item) => {
        let usuario_pontos: UsuarioPontuacaoDto = await this.usuarioPontuacaoRepository.findOne(item.id_usuario);
        let cargo: CargoDto = await this.cargoRepository.findOne(item.id_cargo);
        let perfil: UsuarioPerfilDto = await this.usuarioPerfilRepository.findOne(item.id_usuario);
        retorno.push({
          id_usuario: item.id_usuario,
          ativo_SN: item.ativo_SN,
          colaborador_SN: item.colaborador_SN,
          stamp_created: item.stamp_created,
          cargo: cargo.nome,
          pontos: usuario_pontos.pontos,
          perfil,
        })
      })
    )
    return retorno;
  }


  /**
   * Fazer:
   * - criar função que traz feedbacks e utilizar
   *
   * @param id_usuario
   * @returns Usuario e todas suas informações
   */
  async carregarInfoUsuario(id_usuario: number): Promise<UsuarioRespostaDto> {
    let usuario: UsuarioDto = await this.usuarioRepository.findOne(id_usuario);
    let social: UsuarioSocialDto = await this.usuarioSocialRepository.findOne(id_usuario);
    let perfil: UsuarioPerfilDto = await this.usuarioPerfilRepository.findOne(id_usuario);
    let usuario_pontos: UsuarioPontuacaoDto = await this.usuarioPontuacaoRepository.findOne(id_usuario);
    let cargo: CargoDto = await this.cargoRepository.findOne(usuario.id_cargo);

    let retorno: UsuarioRespostaDto = {
      id_usuario: usuario.id_usuario,
      ativo_SN: usuario.ativo_SN,
      colaborador_SN: usuario.colaborador_SN,
      stamp_created: usuario.stamp_created,
      cargo: cargo.nome,
      pontos: usuario_pontos.pontos,
      social: social,
      perfil: perfil,
      feedback: null,
    }

    return retorno;
  }

  async carregarInfoSocial(id_usuario: number): Promise<any> {
    return this.usuarioSocialRepository.findOne(id_usuario);
  }

  async carregarInfoPerfil(id_usuario: number): Promise<any> {
    return this.usuarioPerfilRepository.findOne(id_usuario);
  }

  async atualizarUsuario(id_usuario: number, data: QueryDeepPartialEntity<UsuarioDto>): Promise<UsuarioDto> {
    const element = await this.usuarioRepository.findOneOrFail(id_usuario);
    if (!element.id_usuario) {
      console.error('Usuario não existe!');
    }
    await this.usuarioRepository.update(id_usuario, data);
    return await this.usuarioRepository.findOne({ id_usuario });
  }

  async deletarUsuario(id_usuario: number) {
    await this.usuarioRepository.delete({ id_usuario });
    return { deleted: true };
  }

  async toggleAtivoOuInativo(id_usuario: number) {
    const aux = await this.usuarioRepository.findOne(id_usuario);

    await getConnection()
      .createQueryBuilder()
      .update(Usuario)
      .set({ ativo_SN: aux.ativo_SN == 'S' ? 'N' : 'S' })
      .where("id_usuario = :id", { id: id_usuario })
      .execute();
    //await this.usuarioRepository.update(id_usuario, { ativo_SN:  });
  }

}
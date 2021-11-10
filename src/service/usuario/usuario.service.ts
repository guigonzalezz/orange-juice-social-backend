import { Injectable, Inject } from '@nestjs/common';
import { Usuario } from 'src/repository/database/usuario/entidades/usuario.entity';
import { UsuarioPerfil } from 'src/repository/database/usuario/entidades/usuario_perfil.entity';
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
    const usuarioEntity: Usuario = Usuario.create();
    usuarioEntity.ativo_SN = 'S'
    usuarioEntity.colaborador_SN = 'S'
    usuarioEntity.stamp_created = new Date()
    usuarioEntity.stamp_disable = null
    usuarioEntity.id_cargo = usuario.id_cargo
    usuarioEntity.perfil = new UsuarioPerfil()
    usuarioEntity.perfil.nome = usuario.nome
    usuarioEntity.perfil.email = usuario.email
    usuarioEntity.perfil.email_empresarial = usuario.email_empresarial
    usuarioEntity.perfil.cpf = usuario.cpf
    usuarioEntity.perfil.data_nasc = new Date(usuario.data_nasc)
    usuarioEntity.perfil.contato = usuario.contato
    usuarioEntity.perfil.cidade = usuario.cidade
    usuarioEntity.perfil.estado = usuario.estado
    usuarioEntity.perfil.pais = usuario.pais
    usuarioEntity.perfil.senha = usuario.cpf //Primeira senha será o cpf dele
    usuarioEntity.social = new UsuarioSocial()
    //achar uma forma de registrar o blob
    usuarioEntity.social.avatar = new Blob(['../../images/default-profile-user.jpg'], { type: 'image/jpg' });
    usuarioEntity.social.banner = new Blob(['../../images/default-banner-user.png'], { type: 'image/png' });

    return usuarioEntity;
    const usuarioSalvo = await Usuario.save(usuarioEntity)
    //if (usuarioSalvo) // envia email
    //https://notiz.dev/blog/send-emails-with-nestjs

    return usuarioSalvo;
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
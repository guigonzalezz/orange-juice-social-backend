import { Injectable, Inject } from '@nestjs/common';
import { Usuario } from 'src/repository/database/usuario/entidades/usuario.entity';
import { Repository, getConnection } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CargoDto } from '../cargo/dto/cargo.dto';
import { UsuarioDto } from './dto/usuario.dto';
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

  //criar função que traz feedbacks e utilizar
  async carregarTodosUsuarios(): Promise<UsuarioRespostaDto[]> {
    let retorno: UsuarioRespostaDto[];
    let usuarios: UsuarioDto[] = await this.usuarioRepository.find();
    usuarios.map(async (item) => {
      retorno.push({
        id_usuario: item.id_usuario,
        ativo_SN: item.ativo_SN,
        colaborador_SN: item.colaborador_SN,
        stamp_created: item.stamp_created,
        cargo: await this.cargoRepository.findOne(item.id_cargo),
        pontos: await this.usuarioPontuacaoRepository.findOne(item.id_usuario).pontos,
        social: await this.usuarioSocialRepository.findOne(item.id_usuario),
        perfil: await this.usuarioPerfilRepository.findOne(item.id_usuario),
        feedback: null,
      })
    })
    return retorno;
  }

  //criar função que traz feedbacks e utilizar
  async carregarInfoUsuario(id_usuario: number): Promise<UsuarioRespostaDto> {
    let usuario: UsuarioDto = await this.usuarioRepository.findOne(id_usuario);
    let social: UsuarioSocialDto = await this.usuarioSocialRepository.findOne(id_usuario);
    let perfil: UsuarioPerfilDto = await this.usuarioPerfilRepository.findOne(id_usuario);
    let pontos: UsuarioPontuacaoDto = await this.usuarioPontuacaoRepository.findOne(id_usuario);
    let cargo: CargoDto = await this.cargoRepository.findOne(usuario.id_cargo);

    let retorno: UsuarioRespostaDto = {
      id_usuario: usuario.id_usuario,
      ativo_SN: usuario.ativo_SN,
      colaborador_SN: usuario.colaborador_SN,
      stamp_created: usuario.stamp_created,
      cargo: cargo,
      pontos: pontos.pontos,
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

  async atualizar(id_usuario: number, data: QueryDeepPartialEntity<UsuarioDto>): Promise<UsuarioDto> {
    const element = await this.usuarioRepository.findOneOrFail(id_usuario);
    if (!element.id_usuario) {
      console.error('Element não existe!');
    }
    await this.usuarioRepository.update(id_usuario, data);
    return await this.usuarioRepository.findOne({ id_usuario });
  }

  async deletar(id_usuario: number) {
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
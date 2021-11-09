import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
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

  async findAll(): Promise<any[]> {
    return this.usuarioRepository.find();
  }

  async carregarInfoUsuario(id_usuario: number): Promise<UsuarioRespostaDto> {
    let usuario: UsuarioDto = this.usuarioRepository.findOne(id_usuario);
    let social: UsuarioSocialDto = this.usuarioSocialRepository.findOne(id_usuario);
    let perfil: UsuarioPerfilDto = this.usuarioPerfilRepository.findOne(id_usuario);
    let pontos: UsuarioPontuacaoDto = this.usuarioPontuacaoRepository.findOne(id_usuario);
    let cargo = this.cargoRepository.findOne();

    let answer = {
      id_usuario: usuario.id_usuario,
      ativo_SN: usuario.ativo_SN,
      colaborador_SN: usuario.colaborador_SN,
      stamp_created: usuario.stamp_created,
      cargo,
      pontos: pontos.pontos,
      social,
      perfil,
      feedback: null,
    }

    return answer;
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
    //const aux = await this.usuarioRepository.findOne(id_usuario).ativo_SN;
    await this.usuarioRepository.update(id_usuario, { ativo_SN: await this.usuarioRepository.findOne(id_usuario).ativo_SN == 'S' ? 'N' : 'S' });
  }

}
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

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
  ) { }

  async findAll(): Promise<any[]> {
    return this.usuarioRepository.find();
  }

  async carregarInfoUsuario(id: number): Promise<any> {
    return this.usuarioRepository.findOne(id);
  }

  async carregarInfoSocial(id: number): Promise<any> {
    return this.usuarioSocialRepository.findOne(id);
  }

  async carregarInfoPerfil(id: number): Promise<any> {
    return this.usuarioPerfilRepository.findOne(id);
  }


}
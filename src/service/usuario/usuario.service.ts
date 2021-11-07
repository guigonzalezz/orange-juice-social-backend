import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<any>,
  ) { }

  async findAll(): Promise<any[]> {
    return this.usuarioRepository.find();
  }
}
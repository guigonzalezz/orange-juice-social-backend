import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { BaseServiceGeneric, BasicResponseInterface } from '../service.generic';
import { UsuarioRepository } from 'src/repository/database/usuario/usuario.repository';
import { SessionTokenRepository } from 'src/repository/database/session-token/session-token.repository';
import { CargoRepository } from 'src/repository/database/cargo/cargo.repository';

@Injectable()
export class AuthService extends BaseServiceGeneric {
  constructor(
    private jwtService: JwtService,
    private usuarioRepository: UsuarioRepository,
    private cargoRepository: CargoRepository,
    private sessionTokenRepository: SessionTokenRepository,
  ) { super() }

  async validarUsuario(email: string, senha: string): Promise<any> {
    let usuario = await this.usuarioRepository.buscarInfoLoginPorEmail(email);
    if(!usuario) return 'Usuario não encontrado!'
    if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
      usuario =  await this.usuarioRepository.buscarUsuarioPerfilPorEmail(usuario.email_empresarial)
      return {
        ...usuario,
        cargo: await this.cargoRepository.buscaCargoPeloId(
          await this.usuarioRepository.buscaIdCargoPorIdUsuario(usuario.id_usuario)
        )
      }
    }else {
      return 'Senha incorreta!';
    }
  }

  async login(usuario: any): Promise<BasicResponseInterface>  {
    if(usuario.error) return this.createReturn(usuario.code, usuario.error)
    const payload = { username: usuario.email_empresarial, sub: usuario.id_usuario, cargo: usuario.cargo.id_cargo };
    const token = this.jwtService.sign(payload);
    await this.sessionTokenRepository.insere(token, usuario.email_empresarial);
    return this.createReturn(200, token)
  }

}
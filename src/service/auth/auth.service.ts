import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { BaseServiceGeneric, BasicResponseInterface } from '../service.generic';
import { UsuarioRepository } from 'src/repository/database/usuario/usuario.repository';
import { SessionTokenRepository } from 'src/repository/database/session-token/session-token.repository';

@Injectable()
export class AuthService extends BaseServiceGeneric {
  constructor(
    private jwtService: JwtService,
    private usuarioRepository: UsuarioRepository,
    private sessionTokenRepository: SessionTokenRepository,
  ) { super() }

  async validarUsuario(email: string, senha: string): Promise<any> {
    const usuario = await this.usuarioRepository.buscarUsuarioPerfilPorEmail(email);
    if(usuario) return usuario
    if (usuario  && bcrypt.compareSync(senha, usuario.senha)) {
      const { senha, ...result } = usuario;
      return result;
    }else {
      return 'Senha incorreta!';
    }
  }

  async login(usuario: any): Promise<BasicResponseInterface>  {
    if(usuario.data) return { code: usuario.code, error: usuario.error }
    const payload = { username: usuario.perfil.email_empresarial, sub: usuario.id_usuario, cargo: usuario.cargo };
    const token = this.jwtService.sign(payload);
    await this.sessionTokenRepository.insere(token, usuario.perfil.email_empresarial);
    return this.createReturn(200, token)
  }

}
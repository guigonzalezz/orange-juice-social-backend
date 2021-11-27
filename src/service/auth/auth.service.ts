import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/service/usuario/usuario.service';
import * as bcrypt from 'bcrypt'
import { SessionTokenService } from '../session-token/session-token.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private sessionTokenService: SessionTokenService,
  ) { }

  async validarUsuario(email: string, senha: string): Promise<any> {
    const usuario = (await this.usuarioService.buscarUsuarioPorEmail(email)).data;
    if(usuario == 'Usuario não encontrado!') return null
    if (usuario  && bcrypt.compareSync(senha, usuario.senha)) {
      const { senha, ...result } = usuario;
      return result;
    }
    return null;
  }

  async login(usuario: any) {
    const payload = { username: usuario.email_empresarial, sub: usuario.id_usuario };
    const token = this.jwtService.sign(payload);
    await this.sessionTokenService.save(token, usuario.email_empresarial);
    return {
      code: 200,
      data: token
    }
  }

}
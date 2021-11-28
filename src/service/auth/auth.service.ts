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
    const usuario = await this.usuarioService.buscarUsuarioPorEmail(email);
    if(usuario.error) return usuario
    if (usuario.data  && bcrypt.compareSync(senha, usuario.data.perfil.senha)) {
      const { senha, ...result } = usuario.data;
      return result;
    }else {
      return 'Senha incorreta!';
    }
  }

  async login(usuario: any) {
    if(usuario.error) return { code: usuario.code, error: usuario.error }
    const payload = { username: usuario.perfil.email_empresarial, sub: usuario.id_usuario, cargo: usuario.cargo };
    const token = this.jwtService.sign(payload);
    await this.sessionTokenService.save(token, usuario.perfil.email_empresarial);
    return {
      code: 200,
      data: token
    }
  }

}
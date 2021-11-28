import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/service/auth/auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'senha',
    });
  }

  async validate(email: string, senha: string): Promise<any> {
    const user = await this.authService.validarUsuario(email, senha);
    if (user == 'Usuario não encontrado!' || user == 'Senha incorreta!') {
      return {
        code:401,
        error: user
      }
    }
    return user;
  }
}
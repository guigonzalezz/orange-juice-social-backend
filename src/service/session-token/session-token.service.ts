import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { SessionToken } from "src/repository/database/session-token/entidades/session-token.entity";
import { Repository } from "typeorm";
import { AuthService } from "../auth/auth.service";
import { UsuarioService } from "../usuario/usuario.service";



@Injectable()
export class SessionTokenService {
  constructor(
    @Inject('SESSION_TOKEN_REPOSITORY')
    private sessionTokenRepository: Repository<SessionToken>,
    private usuarioService: UsuarioService,
    @Inject(forwardRef(()=> AuthService))
    private authService: AuthService
  ) {}


  async save(hash: string, email_empresarial:string){
    let tokenExists = await this.sessionTokenRepository.findOne({email_empresarial})
    if(tokenExists) {
      this.sessionTokenRepository.update(tokenExists.id_token, {
        hash
      })
    }else {
      this.sessionTokenRepository.insert({
        hash: hash,
        email_empresarial: email_empresarial
      })
    }

  }

  async refreshToken(tokenAntigo: string){
    let tokenExists = await this.sessionTokenRepository.findOne({hash:tokenAntigo})

    if(tokenExists){
      let usuario = await this.usuarioService.buscarUsuarioPorEmail(tokenExists.email_empresarial)
      return { 
        code: 200,
        data: await this.authService.login(usuario)
      }
    }else return {code: 401, error: 'Token inválido' }
  }

}
import { Injectable } from "@nestjs/common";
import { SessionTokenRepository } from "src/repository/database/session-token/session-token.repository";
import { UsuarioRepository } from "src/repository/database/usuario/usuario.repository";
import { AuthService } from "../auth/auth.service";
import { BaseServiceGeneric, BasicResponseInterface } from "../service.generic";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable()
export class SessionTokenService extends BaseServiceGeneric {
  constructor(
    private sessionTokenRepository: SessionTokenRepository,
    private usuarioRepository: UsuarioRepository,
    private authService: AuthService
  ) { super()}


  async save(hash: string, email_empresarial:string): Promise<any>{
    let tokenExists = await this.sessionTokenRepository.buscaSessionTokenPorEmailEmpresarial(email_empresarial)
    if(tokenExists) {
      this.sessionTokenRepository.atualiza(tokenExists.id_token, hash)
    }else {
      this.sessionTokenRepository.insere(hash, email_empresarial)
    }
  }

  async refreshToken(tokenAntigo: string): Promise<BasicResponseInterface>{
    let tokenExists = await this.sessionTokenRepository.buscaSessionTokenPorHash(tokenAntigo)

    if(tokenExists){
      let usuario = await this.usuarioRepository.buscarUsuarioPerfilPorEmail(tokenExists.email_empresarial)
      return this.createReturn(200, await this.authService.login(usuario))
    }else return this.createReturn(401,  'Token inválido')
  }

}
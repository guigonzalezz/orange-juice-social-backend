import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SessionToken } from "src/repository/database/session-token/entidades/session-token.entity";
import { Repository } from "typeorm";
import { UsuarioRepository } from "../usuario/usuario.repository";



@Injectable()
export class SessionTokenRepository {
  constructor(
    @InjectRepository(SessionToken)
    private sessionTokenRepository: Repository<SessionToken>,
  ) {}

  async buscaSessionTokenPorEmailEmpresarial(email_empresarial) {
    return await this.sessionTokenRepository.findOne({email_empresarial})
  }

  async buscaSessionTokenPorHash(hash) {
    return await this.sessionTokenRepository.findOne({hash})
  }

  async atualiza( id_token, hash){
    this.sessionTokenRepository.update(id_token, {
      hash
    })
  }

  async insere(hash, email_empresarial) {
    this.sessionTokenRepository.insert({
      hash: hash,
      email_empresarial: email_empresarial
    })
  }

}
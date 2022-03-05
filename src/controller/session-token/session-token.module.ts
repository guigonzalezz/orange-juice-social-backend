import { forwardRef, Module } from "@nestjs/common";
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionTokenRepository } from "src/repository/database/session-token/session-token.repository";
import { UsuarioRepository } from "src/repository/database/usuario/usuario.repository";
import { AuthService } from "src/service/auth/auth.service";
import { SessionTokenService } from "src/service/session-token/session-token.service";
import { SessionTokenController } from "./session-token.controller";
import { SessionTokenV2 } from "src/repository/database/session-token/entidades/session-token.entity";
import { AuthModule } from "../auth/auth.module";
import { UsuarioModule } from "../usuario/usuario.module";
import { CargoModule } from "../cargo/cargo.module";
import { CargoRepository } from "src/repository/database/cargo/cargo.repository";

@Module({
  imports: [TypeOrmModule.forFeature([SessionTokenV2]), HttpModule, UsuarioModule, CargoModule, forwardRef(()=>AuthModule)],
  controllers: [SessionTokenController],
  providers: [
    UsuarioRepository,
    CargoRepository,
    AuthService,
    SessionTokenService,
    SessionTokenRepository,
  ],
  exports: [SessionTokenService, TypeOrmModule],
})
export class SessionTokenModule {}
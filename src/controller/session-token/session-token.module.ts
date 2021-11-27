import { forwardRef, Module } from "@nestjs/common";
import { DatabaseModule } from "src/repository/database/database.module";
import { sessionTokenProviders } from "src/repository/database/session-token/session-token.providers";
import { SessionTokenService } from "src/service/session-token/session-token.service";
import { AuthModule } from "../auth/auth.module";
import { UsuarioModule } from "../usuario/usuario.module";
import { SessionTokenController } from "./session-token.controller";



@Module({
  imports: [DatabaseModule, forwardRef(()=>AuthModule), UsuarioModule],
  controllers: [SessionTokenController],
  providers: [
    ...sessionTokenProviders,
    SessionTokenService
  ],
  exports: [SessionTokenService],
})
export class SessionTokenModule {}
import { Module } from '@nestjs/common';
import { CargoModule } from './controller/cargo/cargo.module';
import { UsuarioModule } from './controller/usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './controller/auth/auth.module';
import { DatabaseModule } from './repository/database/database.module';
import { SessionTokenModule } from './controller/session-token/session-token.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule { }

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuarioModule } from 'src/controller/usuario/usuario.module';
import { JwtStrategy } from 'src/infraestructure/auth/jwt.strategy';
import { LocalStrategy } from 'src/infraestructure/auth/local.strategy';
import { CargoRepository } from 'src/repository/database/cargo/cargo.repository';
import { SessionTokenRepository } from 'src/repository/database/session-token/session-token.repository';
import { UsuarioRepository } from 'src/repository/database/usuario/usuario.repository';
import { AuthService } from 'src/service/auth/auth.service';
import { CargoModule } from '../cargo/cargo.module';
import { SessionTokenModule } from '../session-token/session-token.module';
import { AuthController } from './auth.controller';
require("dotenv").config();

@Module({
  imports: [
    UsuarioModule,
    CargoModule,
    PassportModule,
    SessionTokenModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60m'},
    })
  ],
  controllers: [AuthController],
  providers: [ 
    AuthService,
    LocalStrategy, 
    JwtStrategy, 
    SessionTokenRepository, 
    UsuarioRepository,
    CargoRepository,
  ],
  exports: [AuthService,JwtModule]
})
export class AuthModule { }
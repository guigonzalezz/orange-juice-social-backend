import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuarioModule } from 'src/controller/usuario/usuario.module';
import { JwtStrategy } from 'src/infraestructure/auth/jwt.strategy';
import { LocalStrategy } from 'src/infraestructure/auth/local.strategy';
import { AuthService } from 'src/service/auth/auth.service';
import { SessionTokenModule } from '../session-token/session-token.module';
import { AuthController } from './auth.controller';
require("dotenv").config();

@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60m'},
    }),
    SessionTokenModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule]
})
export class AuthModule { }
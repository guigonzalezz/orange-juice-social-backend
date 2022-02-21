import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from '../../service/usuario/usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/infraestructure/auth/jwt.strategy';
import { CargoRepository } from 'src/repository/database/cargo/cargo.repository';
import { UsuarioRepository } from 'src/repository/database/usuario/usuario.repository';
import { Usuario } from 'src/repository/database/usuario/entidades/usuario.entity';
import { UsuarioPerfil } from 'src/repository/database/usuario/entidades/usuario_perfil.entity';
import { UsuarioSocial } from 'src/repository/database/usuario/entidades/usuario_social.entity';
import { UsuarioPontuacao } from 'src/repository/database/usuario/entidades/usuario_pontuacao.entity';
import { Cargo } from 'src/repository/database/cargo/entidades/cargo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, UsuarioPerfil, UsuarioSocial, UsuarioPontuacao, Cargo]), HttpModule],
  controllers: [UsuarioController],
  providers: [
    CargoRepository,
    UsuarioRepository,
    UsuarioService,
    JwtStrategy
  ],
  exports: [TypeOrmModule],
})
export class UsuarioModule { }
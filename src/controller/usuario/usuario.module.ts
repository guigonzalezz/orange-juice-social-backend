import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from '../../service/usuario/usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/infraestructure/auth/jwt.strategy';
import { UsuarioRepository } from 'src/repository/database/usuario/usuario.repository';
import { UsuarioV2 } from 'src/repository/database/usuario/entidades/usuario.entity';
import { UsuarioPerfil } from 'src/repository/database/usuario/entidades/usuario_perfil.entity';
import { UsuarioSocial } from 'src/repository/database/usuario/entidades/usuario_social.entity';
import { UsuarioPontuacao } from 'src/repository/database/usuario/entidades/usuario_pontuacao.entity';
import { CargoModule } from '../cargo/cargo.module';
import { CargoRepository } from 'src/repository/database/cargo/cargo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioV2, UsuarioPerfil, UsuarioSocial, UsuarioPontuacao]), HttpModule, CargoModule],
  controllers: [UsuarioController],
  providers: [
    JwtStrategy,
    UsuarioService,
    UsuarioRepository,
    CargoRepository
  ],
  exports: [UsuarioService, TypeOrmModule],
})
export class UsuarioModule { }
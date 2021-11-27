import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../repository/database/database.module';
import { UsuarioController } from './usuario.controller';
import { usuarioProviders } from '../../repository/database/usuario/usuario.providers';
import { UsuarioService } from '../../service/usuario/usuario.service';
import { ContentfulModule } from 'src/repository/contentful/contentful.module';
import { CargoModule } from '../cargo/cargo.module';

@Module({
  imports: [DatabaseModule, ContentfulModule, CargoModule],
  controllers: [UsuarioController],
  providers: [
    ...usuarioProviders,
    UsuarioService
  ],
  exports: [UsuarioService],
})
export class UsuarioModule { }
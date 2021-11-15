import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../repository/database/database.module';
import { UsuarioController } from './usuario.controller';
import { usuarioProviders } from '../../repository/database/usuario/usuario.providers';
import { UsuarioService } from '../../service/usuario/usuario.service';
import { cargoProviders } from '../../repository/database/cargo/cargo.providers';
import { ContentfulModule } from 'src/repository/contentful/contentful.module';

@Module({
  imports: [DatabaseModule, ContentfulModule],
  controllers: [UsuarioController],
  providers: [
    ...usuarioProviders,
    ...cargoProviders,
    UsuarioService
  ],
})
export class UsuarioModule { }
import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../repository/database/database.module';
import { UsuarioController } from './usuario.controller';
import { usuarioProviders } from '../../repository/database/usuario/usuario.providers';
import { UsuarioService } from '../../service/usuario/usuario.service';
import { CargoModule } from '../cargo/cargo.module';
import { AuthModule } from '../auth/auth.module';
import { ContentfulModule } from '../contentful/contentful.module';

@Module({
  imports: [DatabaseModule, ContentfulModule, CargoModule, forwardRef(() => AuthModule)],
  controllers: [UsuarioController],
  providers: [
    ...usuarioProviders,
    UsuarioService
  ],
  exports: [UsuarioService],
})
export class UsuarioModule { }
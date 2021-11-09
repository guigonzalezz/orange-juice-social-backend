import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../repository/database/database.module';
import { UsuarioController } from './usuario.controller';
import { usuarioProviders } from '../../repository/database/usuario/usuario.providers';
import { UsuarioService } from '../../service/usuario/usuario.service';
import { cargoProviders } from '../../repository/database/cargo/cargo.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuarioController],
  providers: [
    ...usuarioProviders,
    ...cargoProviders,
    UsuarioService
  ],
})
export class UsuarioModule { }
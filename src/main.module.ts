import { Module } from '@nestjs/common';
import { UsuarioModule } from './controller/usuario/usuario.module';

@Module({
  imports: [
    UsuarioModule
  ],
  controllers: [],
  providers: [],
})
export class MainModule { }

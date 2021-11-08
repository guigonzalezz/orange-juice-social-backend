import { Module } from '@nestjs/common';
import { CargoModule } from './controller/cargo/cargo.module';
import { UsuarioModule } from './controller/usuario/usuario.module';

@Module({
  imports: [
    UsuarioModule,
    CargoModule
  ],
  controllers: [],
  providers: [],
})
export class MainModule { }

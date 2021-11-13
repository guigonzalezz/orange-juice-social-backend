import { Module } from '@nestjs/common';
import { CargoModule } from './controller/cargo/cargo.module';
import { UsuarioModule } from './controller/usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsuarioModule,
    CargoModule
  ],
  controllers: [],
  providers: [],
})
export class MainModule { }

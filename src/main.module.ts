import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './controller/auth/auth.module';
import { configService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentfulModule } from './controller/contentful/contentful.module';
import { CargoModule } from './controller/cargo/cargo.module';
import { UsuarioModule } from './controller/usuario/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    UsuarioModule,
    CargoModule,
    ContentfulModule
  ],
  controllers: [],
  providers: [],
})
export class MainModule { }

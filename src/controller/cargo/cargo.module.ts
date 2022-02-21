import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { CargoController } from './cargo.controller'
import { CargoService } from '../../service/cargo/cargo.service'
import { CargoRepository } from 'src/repository/database/cargo/cargo.repository'
import { JwtStrategy } from 'src/infraestructure/auth/jwt.strategy'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cargo } from 'src/repository/database/cargo/entidades/cargo.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Cargo]), HttpModule],
  controllers: [CargoController],
  providers: [
    CargoRepository,
    CargoService,
    JwtStrategy
  ],
  exports: [TypeOrmModule],
})
export class CargoModule { }
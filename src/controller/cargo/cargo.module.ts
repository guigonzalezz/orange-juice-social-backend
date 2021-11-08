import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../repository/database/database.module';
import { CargoController } from './cargo.controller';
import { cargoProviders } from '../../repository/database/cargo/cargo.providers';
import { CargoService } from '../../service/cargo/cargo.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CargoController],
  providers: [
    ...cargoProviders,
    CargoService,
  ],
})
export class CargoModule { }
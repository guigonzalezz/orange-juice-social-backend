import { Controller, Get } from '@nestjs/common';
import { CargoService } from '../../service/cargo/cargo.service';

@Controller('cargo')
export class CargoController {
  constructor(private readonly cargoService: CargoService) { }


  @Get('listar')
  async listar(): Promise<any[]> {
    return this.cargoService.carregarTodos();
  }
}
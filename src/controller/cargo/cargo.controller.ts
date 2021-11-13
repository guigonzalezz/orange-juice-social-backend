import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CargoService } from '../../service/cargo/cargo.service';

@Controller('cargo')
export class CargoController {
  constructor(private readonly cargoService: CargoService) { }


  @Get('listar')
  async listar(): Promise<any[]> {
    return this.cargoService.carregarTodos();
  }

  @Post('cadastrar')
  async cadastrar(@Body() data) {
    return this.cargoService.criarCargo(data);
  }

  @Get('buscarId')
  async carregarCargoPeloId(@Query('id_cargo') id: number) {
    return this.cargoService.findById(id);
  }

  @Get('buscarNome')
  async carregarCargoPeloNome(@Query('nome') nome: string) {
    return this.cargoService.findByNome(nome);
  }

  @Patch('atualizar/:id')
  async atualizarCargo(@Param('id') id: number, @Body() data) {
    return this.cargoService.atualizar(id, data);
  }

  @Delete('deletar')
  async deletarcargo(@Query('id_cargo') id: number) {
    return this.cargoService.deletar(id);
  }
}
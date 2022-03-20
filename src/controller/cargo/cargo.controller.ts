import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { CargoService } from '../../service/cargo/cargo.service';

@Controller('cargo')
export class CargoController {
  constructor(private readonly cargoService: CargoService) { }


  @Get('listar')
  async listar(@Res() response) {
    const result = await this.cargoService.carregarTodosAtivosSemAdmin()
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('listar_todos')
  async listarTodos(@Res() response) {
    const result = await this.cargoService.carregarTodosSemAdmin()
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Post('cadastrar')
  async cadastrar(@Body() data, @Res() response) {
    const result = await this.cargoService.criarCargo(data)
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data);
  }

  @Get('buscar_id')
  async carregarCargoPeloId(@Query('id_cargo') id: number, @Res() response) {
    const result = await this.cargoService.findById(id)
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data);
  }

  @Patch('toggle_ativo_inativo')
  async toggleAtivarOuInativar(@Query('id_cargo') id: number, @Res() response) {
    const result = await this.cargoService.toggleAtivoOuInativo(id);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('buscar_nome')
  async carregarCargoPeloNome(@Query('nome') nome: string, @Res() response) {
    const result = await this.cargoService.findByNome(nome)
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Patch('atualizar/:id')
  async atualizarCargo(@Param('id') id: number, @Body() data, @Res() response) {
    const result = await this.cargoService.atualizar(id, data);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Delete('deletar')
  async deletarcargo(@Query('id_cargo') id: number, @Res() response) {
    const result = await this.cargoService.deletar(id);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }
}
import { Controller, Get } from '@nestjs/common';
import { UsuarioService } from '../../service/usuario/usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }


  @Get('listar')
  async listar(): Promise<any[]> {
    return this.usuarioService.findAll();
  }
}
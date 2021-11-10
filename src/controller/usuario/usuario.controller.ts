import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsuarioService } from '../../service/usuario/usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post('cadastrarUsuario')
  async cadastrarUsuario(@Body() data) {
    return this.usuarioService.cadastrarUsuario(data);
  }

  @Get('listarTodos')
  async listar(): Promise<any[]> {
    return this.usuarioService.carregarTodosUsuarios();
  }

  @Get('buscarUsuario')
  async carregarInfoUsuario(@Query('id_usuario') id: number) {
    return this.usuarioService.carregarInfoUsuario(id);
  }

  @Get('buscarUsuarioSocial')
  async carregarInfoUsuarioSocial(@Query('id_usuario') id: number) {
    return this.usuarioService.carregarInfoSocial(id);
  }

  @Get('buscarUsuarioPerfil')
  async carregarInfoUsuarioPerfill(@Query('id_usuario') id: number) {
    return this.usuarioService.carregarInfoPerfil(id);
  }

  @Patch('toggleUsuario')
  async toggleAtivarOuInativar(@Query('id_usuario') id: number) {
    return this.usuarioService.toggleAtivoOuInativo(id);
  }

  @Patch('atualizarUsuario')
  async atualizarUsuario(@Body() data) {
    return this.usuarioService.atualizarUsuario(data.id, data);
  }

  @Delete('deletarUsuario')
  async deletarUsuario(@Query('id_usuario') id: number) {
    return this.usuarioService.deletarUsuario(id);
  }
}
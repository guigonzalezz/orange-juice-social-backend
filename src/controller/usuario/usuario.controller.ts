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

  @Get('buscar')
  async carregarInfoUsuario(@Query('id_usuario') id: number) {
    return this.usuarioService.carregarInfoUsuario(id);
  }

  @Get('buscarSocial')
  async carregarInfoUsuarioSocial(@Query('id_usuario') id: number) {
    return this.usuarioService.carregarInfoSocial(id);
  }

  @Get('buscarPerfil')
  async carregarInfoUsuarioPerfill(@Query('id_usuario') id: number) {
    return this.usuarioService.carregarInfoPerfil(id);
  }

  @Patch('toggleAtivoInativo')
  async toggleAtivarOuInativar(@Query('id_usuario') id: number) {
    return this.usuarioService.toggleAtivoOuInativo(id);
  }

  @Patch('atualizarPerfil/:id')
  async atualizarUsuarioPerfil(@Param('id') id: number, @Body() data) {
    return this.usuarioService.atualizarUsuarioPerfil(id, data);
  }

  @Delete('deletar')
  async deletarUsuario(@Query('id_usuario') id: number) {
    return this.usuarioService.deletarUsuario(id);
  }
}
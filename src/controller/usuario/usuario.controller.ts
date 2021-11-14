import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsuarioService } from '../../service/usuario/usuario.service';
//import { Express } from 'express';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post('cadastrar')
  async cadastrarUsuario(@Body() data) {
    return this.usuarioService.cadastrarUsuario(data);
  }

  @Get('listar')
  async listar() {
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

  @Post('avatar/adicionar/:id')
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(@Param('id') id: number, @UploadedFile() file) {
    return this.usuarioService.addAvatar(file.buffer, id);
  }

  @Post('banner/adicionar/:id')
  @UseInterceptors(FileInterceptor('file'))
  async addBanner(@Param('id') id: number, @UploadedFile() file) {
    return this.usuarioService.addBanner(file.buffer, id);
  }

  @Delete('avatar/deletar/:id')
  async deletarAvatar(@Param('id') id: number) {
    return this.usuarioService.deleteAvatar(id);
  }

  @Delete('banner/deletar/:id')
  async deletarBanner(@Param('id') id: number) {
    return this.usuarioService.deleteBanner(id);
  }

  @Get('avatar/buscar/:id')
  async buscarAvatar(@Param('id') id: number) {
    return this.usuarioService.getAvatar(id);
  }

  @Get('banner/buscar/:id')
  async buscarBanner(@Param('id') id: number) {
    return this.usuarioService.getBanner(id);
  }

}
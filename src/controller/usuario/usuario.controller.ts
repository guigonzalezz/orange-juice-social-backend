import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsuarioService } from '../../service/usuario/usuario.service';
//import { Express } from 'express';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post('cadastrar')
  async cadastrarUsuario(@Body() data, @Res() response) {
    const result = await this.usuarioService.cadastrarUsuario(data);
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }

  @Get('listar')
  async listar(@Res() response) {
    const result = await this.usuarioService.carregarTodosUsuarios();
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }

  @Get('buscar')
  async carregarInfoUsuario(@Query('id_usuario') id: number, @Res() response) {
    const result = await this.usuarioService.carregarInfoUsuario(id);
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }

  @Get('buscarSocial')
  async carregarInfoUsuarioSocial(@Query('id_usuario') id: number, @Res() response) {
    const result = await this.usuarioService.carregarInfoSocial(id);
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }

  @Get('buscarPerfil')
  async carregarInfoUsuarioPerfill(@Query('id_usuario') id: number, @Res() response) {
    const result = await this.usuarioService.carregarInfoPerfil(id);
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }

  @Patch('toggleAtivoInativo')
  async toggleAtivarOuInativar(@Query('id_usuario') id: number, @Res() response) {
    const result = await this.usuarioService.toggleAtivoOuInativo(id);
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }

  @Patch('atualizarPerfil/:id')
  async atualizarUsuarioPerfil(@Param('id') id: number, @Body() data, @Res() response) {
    const result = await this.usuarioService.atualizarUsuarioPerfil(id, data);
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }

  @Patch('atualizarSocial/:id')
  async atualizarUsuarioSocial(@Param('id') id: number, @Body() data, @Res() response) {
    const result = await this.usuarioService.atualizarUsuarioSocial(id, data);
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }

  @Delete('deletar')
  async deletarUsuario(@Query('id_usuario') id: number, @Res() response) {
    const result = await this.usuarioService.deletarUsuario(id);
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }

  @Post('avatar/adicionar/:id')
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(@Param('id') id: number, @UploadedFile() file, @Res() response) {
    const result = await this.usuarioService.addAvatar(file.buffer, id);
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }

  @Post('banner/adicionar/:id')
  @UseInterceptors(FileInterceptor('file'))
  async addBanner(@Param('id') id: number, @UploadedFile() file, @Res() response) {
    const result = await this.usuarioService.addBanner(file.buffer, id);
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }

  @Delete('avatar/deletar/:id')
  async deletarAvatar(@Param('id') id: number, @Res() response) {
    const result = await this.usuarioService.deleteAvatar(id);
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }

  @Delete('banner/deletar/:id')
  async deletarBanner(@Param('id') id: number, @Res() response) {
    const result = await this.usuarioService.deleteBanner(id);
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }

  @Get('avatar/buscar/:id')
  async buscarAvatar(@Param('id') id: number, @Res() response) {
    const result = await this.usuarioService.getAvatar(id);
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }

  @Get('banner/buscar/:id')
  async buscarBanner(@Param('id') id: number, @Res() response) {
    const result = await this.usuarioService.getBanner(id);
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }
  
  @Post('seguir')
  async seguir(@Query('seguidor') id_seguidor: number, @Query('seguido') id_seguido: number, @Res() response) {
    const result = await this.usuarioService.seguir(id_seguidor, id_seguido);
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }

  @Post('deixar_de_seguir')
  async deixarDeSeguir(@Query('seguidor') id_seguidor: number, @Query('seguido') id_seguido: number, @Res() response) {
    const result = await this.usuarioService.deixarDeSeguir(id_seguidor, id_seguido);
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }

  @Get('listar_seguidores')
  async listarSeguidores(@Query('id_usuario_social') id: number, @Res() response) {
    const result = await this.usuarioService.listarSeguidores(id);
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }

  @Get('listar_quem_sigo')
  async listarQuemSigo(@Query('id_usuario_social') id: number, @Res() response) {
    const result = await this.usuarioService.listarQuemSigo(id);
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }

  @Get('qtd_seguindo_e_seguidores')
  async quantosSeguindoESeguidores(@Query('id_usuario_social') id: number, @Res() response) {
    const result = await this.usuarioService.quantosSeguindoESeguidores(id);
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }
}
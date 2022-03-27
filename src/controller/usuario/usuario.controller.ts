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
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('listar')
  async listar(@Res() response) {
    const result = await this.usuarioService.carregarTodosUsuarios();
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('buscar')
  async carregarInfoUsuario(@Query('id_usuario') id: number, @Res() response) {
    const result = await this.usuarioService.carregarInfoUsuario(id);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('buscar_por_email')
  async carregarInfoUsuarioPorEmail(@Query('email_empresarial') email: string, @Res() response) {
    const result = await this.usuarioService.carregarInfoUsuarioPorEmail(email);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('buscar_cargo')
  async carregarCargoUsuario(@Query('id_usuario') id: number, @Res() response) {
    const result = await this.usuarioService.carregarCargoUsuario(id);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('verifica_cargo_em_uso')
  async verificaSeCargoEstaEmUsoParaDelecao(@Query('id_cargo') id: number, @Res() response) {
    const result = await this.usuarioService.verificaSeCargoEstaEmUsoParaDelecao(id);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('buscar_social')
  async carregarInfoUsuarioSocial(@Query('id_usuario') id: number, @Res() response) {
    const result = await this.usuarioService.carregarInfoSocial(id);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('buscar_perfil')
  async carregarInfoUsuarioPerfill(@Query('id_usuario') id: number, @Res() response) {
    const result = await this.usuarioService.carregarInfoPerfil(id);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Patch('toggle_ativo_inativo')
  async toggleAtivarOuInativar(@Query('id_usuario') id: number, @Res() response) {
    const result = await this.usuarioService.toggleAtivoOuInativo(id);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Patch('atualizar_perfil/:id')
  async atualizarUsuarioPerfil(@Param('id') id: number, @Body() data, @Res() response) {
    const result = await this.usuarioService.atualizarUsuarioPerfil(id, data);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Patch('atualizar_cargo/:id')
  async atualizarUsuarioCargo(@Param('id') id: number, @Query('id_cargo') id_cargo, @Res() response) {
    const result = await this.usuarioService.atualizarUsuarioCargo(id, id_cargo);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Patch('atualizar_social/:id')
  async atualizarUsuarioSocial(@Param('id') id: number, @Body() data, @Res() response) {
    const result = await this.usuarioService.atualizarUsuarioSocial(id, data);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Delete('deletar')
  async deletarUsuario(@Query('id_usuario') id: number, @Res() response) {
    const result = await this.usuarioService.deletarUsuario(id);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Delete('deletar_varios')
  async deletarVariosUsuario(@Query('ids') ids: string, @Res() response) {
    const result = await this.usuarioService.deletarVariosUsuario(ids);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Post('avatar/adicionar/:id')
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(@Param('id') id: number, @UploadedFile() file, @Res() response) {
    const result = await this.usuarioService.addAvatar(file.buffer, id);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Post('banner/adicionar/:id')
  @UseInterceptors(FileInterceptor('file'))
  async addBanner(@Param('id') id: number, @UploadedFile() file, @Res() response) {
    const result = await this.usuarioService.addBanner(file.buffer, id);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Delete('avatar/deletar/:id')
  async deletarAvatar(@Param('id') id: number, @Res() response) {
    const result = await this.usuarioService.deleteAvatar(id);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Delete('banner/deletar/:id')
  async deletarBanner(@Param('id') id: number, @Res() response) {
    const result = await this.usuarioService.deleteBanner(id);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('avatar/buscar/:id')
  async buscarAvatar(@Param('id') id: number, @Res() response) {
    const result = await this.usuarioService.getAvatar(id);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('banner/buscar/:id')
  async buscarBanner(@Param('id') id: number, @Res() response) {
    const result = await this.usuarioService.getBanner(id);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }
  
  @Post('seguir')
  async seguir(@Query('seguidor') id_seguidor: number, @Query('seguido') id_seguido: number, @Res() response) {
    const result = await this.usuarioService.seguir(id_seguidor, id_seguido);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Post('deixar_de_seguir')
  async deixarDeSeguir(@Query('seguidor') id_seguidor: number, @Query('seguido') id_seguido: number, @Res() response) {
    const result = await this.usuarioService.deixarDeSeguir(id_seguidor, id_seguido);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('listar_Seguidores')
  async listarSeguidores(@Query('id_usuario_social') id: number, @Res() response) {
    const result = await this.usuarioService.listarSeguidores(id);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('listar_quem_sigo')
  async listarQuemSigo(@Query('id_usuario_social') id: number, @Res() response) {
    const result = await this.usuarioService.listarQuemSigo(id);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('qtd_seguindo_e_seguidores')
  async quantosSeguindoESeguidores(@Query('id_usuario_social') id: number, @Res() response) {
    const result = await this.usuarioService.quantosSeguindoESeguidores(id);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Post('concluir/desafio')
  async concluirDesafio(@Body() data, @Res() response) {
    const result = await this.usuarioService.concluirDesafio(data);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Post('concluir/quiz')
  async concluirQuiz(@Body() data, @Res() response) {
    const result = await this.usuarioService.concluirQuiz(data);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }
  
  @Post('concluir/trilha')
  async concluirTrilha(@Body() data, @Res() response) {
    const result = await this.usuarioService.concluirTrilha(data);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Post('concluir/curso')
  async concluirCurso(@Body() data, @Res() response) {
    const result = await this.usuarioService.concluirCurso(data);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Post('concluir/blog')
  async concluirBlogLeitura(@Body() data, @Res() response) {
    const result = await this.usuarioService.concluirBlogLeitura(data);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Post('feedback/desafio')
  async enviarDesafioFeedbackNota(@Body() data, @Res() response) {
    const result = await this.usuarioService.enviarDesafioFeedbackNota(data);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Post('feedback/quiz')
  async enviarQuizFeedbackNota(@Body() data, @Res() response) {
    const result = await this.usuarioService.enviarQuizFeedbackNota(data);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('recuperacao_senha')
  async recuperarSenha(@Query('email') email: string, @Res() response) {
    //const result = await this.usuarioService.alterarSenha(data);
    // if (await (result).data) response.status(result.code).send(result.data)
    // else return response.status(result.code).send(result.data)
    //Envia o email pro paciente e retorna o codigo para o front, nao registra o codigo em nenhum
    //lugar, apenas retorna para realizar a comunicacao
    return response.status(200).send("code")
  }

  @Patch('alterar_senha')
  async alterarSenha(@Body() data, @Res() response) {
    const result = await this.usuarioService.alterarSenha(data);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Patch('alterar_senha_nova')
  async alterarSenhaNova(@Body() data, @Res() response) {
    const result = await this.usuarioService.alterarSenhaNova(data);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('desafios')
  async carregarDesafios(@Res() response) {
    const result = await this.usuarioService.carregarDesafiosEnviadosComFeedbacks();
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('desafios_usuario')
  async carregarDesafiosUsuario(@Query('id_usuario') id: number, @Res() response) {
    const result = await this.usuarioService.carregarDesafiosEnviadosComFeedbacksDoUsuarioId(id);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('quizzes')
  async carregarQuizzes(@Res() response) {
    const result = await this.usuarioService.carregarQuizzesEnviadosComFeedbacks();
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('trilhas')
  async carregarTrilhasUsuario(@Query('id_usuario') id_usuario:number, @Res() response) {
    const result = await this.usuarioService.carregarTrilhasUsuario(id_usuario);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('cursos')
  async carregarCursosUsuario(@Query('id_usuario') id_usuario:number, @Res() response) {
    const result = await this.usuarioService.carregarCursosUsuario(id_usuario);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }
}
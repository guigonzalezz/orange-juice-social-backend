import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsuarioService } from '../../service/usuario/usuario.service';
//import { Express } from 'express';

@Controller('relatorio')
export class RelatorioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Get('usuarios_ativos')
  async UsuariosAtivos(@Res() response) {
    const result = await this.usuarioService.carregarTodosUsuariosAtivosNomeEmailCel();
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('usuario_ficha')
  async carregarDesafiosUsuario(@Query('email_empresarial') email_empresarial: string, @Res() response) {
    const result = await this.usuarioService.carregaFichaUsuario(email_empresarial);
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('ranqueamento_usuarios')
  async carregarRanqueamentoUsuarios(@Res() response) {
    const result = await this.usuarioService.carregarRanqueamentoUsuarios();
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('notas_desafios_usuarios')
  async carregarNotasDesafiosUsuarios(@Res() response) {
    const result = await this.usuarioService.carregarNotasDesafiosUsuarios();
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('qtd_conclusao_cursos')
  async carregarQtdConclusaoCursos(@Res() response) {
    const result = await this.usuarioService.carregarQtdConclusaoCursos();
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('qtd_conclusao_quizzes')
  async carregarQtdConclusaoQuizzes(@Res() response) {
    const result = await this.usuarioService.carregarQtdConclusaoQuizzes();
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('qtd_conclusao_desafios')
  async carregarQtdConclusaoDesafios(@Res() response) {
    const result = await this.usuarioService.carregarQtdConclusaoDesafios();
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }


}
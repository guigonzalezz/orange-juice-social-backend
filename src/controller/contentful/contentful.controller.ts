import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { ContentfulService } from '../../service/contentful/contentful.service';

@Controller('contentful')
export class ContentfulController {
  constructor(private readonly contentfulService: ContentfulService) { }


  @Get('teste')
  async retornaNomeProjetoContentful(@Res() response) {
    const result = await this.contentfulService.retornaNomeProjetoContentful()
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result)
  }

  @Get('entries/quizzes')
  async retornaQuizzes(@Res() response) {
    const result = await this.contentfulService.retornaQuizzes()
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result)
  }

  @Get('entries/desafios')
  async retornaDesafios(@Res() response) {
    const result = await this.contentfulService.retornaDesafios()
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result)
  }

  @Get('entries/trilhas')
  async retornaTrilhas(@Res() response) {
    const result = await this.contentfulService.retornaTrilhas()
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result)
  }

  @Get('entries/noticias')
  async retornaNoticias(@Res() response) {
    const result = await this.contentfulService.retornaNoticias()
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result)
  }

  @Get('entries/eventos')
  async retornaEventos(@Res() response) {
    const result = await this.contentfulService.retornaEventos()
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result)
  }

  @Get('entries/blogs')
  async retornaBlogs(@Res() response) {
    const result = await this.contentfulService.retornaBlogs()
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result)
  }
}
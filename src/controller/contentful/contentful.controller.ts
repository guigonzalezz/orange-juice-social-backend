import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { ContentfulService } from '../../service/contentful/contentful.service';

@Controller('contentful')
export class ContentfulController {
  constructor(private readonly contentfulService: ContentfulService) { }


  @Get('teste')
  async retornaNomeProjetoContentful(@Res() response) {
    const result = await this.contentfulService.retornaNomeProjetoContentful()
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('entries/quizzes')
  async retornaQuizzes(@Query('cargo') cargo,@Res() response) {
    const result = await this.contentfulService.retornaQuizzes(cargo)
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('entries/desafios')
  async retornaDesafios(@Query('cargo') cargo,@Res() response) {
    const result = await this.contentfulService.retornaDesafios(cargo)
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('entries/trilhas')
  async retornaTrilhas(@Query('cargo') cargo,@Res() response) {
    const result = await this.contentfulService.retornaTrilhas(cargo)
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('entries/noticias')
  async retornaNoticias(@Res() response) {
    const result = await this.contentfulService.retornaNoticias()
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('entries/eventos')
  async retornaEventos(@Res() response) {
    const result = await this.contentfulService.retornaEventos()
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('entries/blogs')
  async retornaBlogs(@Res() response) {
    const result = await this.contentfulService.retornaBlogs()
    if (await (result).data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result.data)
  }

  @Get('entries/home')
  async retornaHome(@Res() response) {
    const resultBlogs = (await this.contentfulService.retornaBlogs()).data
    const resultEventos = (await this.contentfulService.retornaEventos()).data
    const resultNoticias = (await this.contentfulService.retornaNoticias()).data
    response.status(200).send({
      resultBlogs,
      resultEventos,
      resultNoticias
    })
  }

}
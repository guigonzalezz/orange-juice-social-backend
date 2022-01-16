import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { ContentfulService } from '../../service/contentful/contentful.service';

@Controller('contentful')
export class ContentfulController {
  constructor(private readonly contentfulService: ContentfulService) { }


  @Get('teste')
  async primeiroTesteIntegracao(@Res() response) {
    const result = await this.contentfulService.primeiroTesteIntegracao()
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result)
  }
}
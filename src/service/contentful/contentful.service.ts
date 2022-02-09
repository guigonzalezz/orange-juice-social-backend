import { Injectable, Inject } from '@nestjs/common';
import { ContentfulClientApi } from 'contentful' 
import { DeepPartial, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';


@Injectable()
export class ContentfulService {
  constructor(
    @Inject('CONTENTFUL_CONNECTION')
    private contentfulClient: ContentfulClientApi,

  ) { }

  async retornaNomeProjetoContentful() {
    return {
      code: 200,
      data: (await this.contentfulClient.getSpace()).name
    }
  }

  async retornaQuizzes() {
    return {
      code: 200,
      data: await this.contentfulClient.getEntries({ content_type: 'quiz'})
    }
  }

  async retornaTrilhas() {
    return {
      code: 200,
      data: await this.contentfulClient.getEntries({ content_type: 'trilha'})
    }
  }
  async retornaEventos() {
    return {
      code: 200,
      data: await this.contentfulClient.getEntries({ content_type: 'evento'})
    }
  }
  async retornaBlogs() {
    return {
      code: 200,
      data: await this.contentfulClient.getEntries({ content_type: 'blog'})
    }
  }
  async retornaNoticias() {
    return {
      code: 200,
      data: await this.contentfulClient.getEntries({ content_type: 'noticia'})
    }
  }
  async retornaDesafios() {
    return {
      code: 200,
      data: await this.contentfulClient.getEntries({ content_type: 'desafio'})
    }
  }

}
import { Injectable } from '@nestjs/common';
import { ContentfulRepository } from 'src/repository/contentful/contentful.repository';
import { BaseServiceGeneric, BasicResponseInterface } from '../service.generic';

@Injectable()
export class ContentfulService extends BaseServiceGeneric {
  constructor(
    private readonly contentfulRepository: ContentfulRepository
  ) { super() }
    
  async retornaNomeProjetoContentful(): Promise<BasicResponseInterface> {
    return this.createReturn(200, await this.contentfulRepository.retornaNomeProjetoContentful())
  }

  async retornaQuizzes(): Promise<BasicResponseInterface> {
    return this.createReturn(200, await this.contentfulRepository.retornaQuizzes())
  }

  async retornaTrilhas(): Promise<BasicResponseInterface> {
    return this.createReturn(200, await this.contentfulRepository.retornaTrilhas())
  }
  
  async retornaEventos(): Promise<BasicResponseInterface> {
    return this.createReturn(200, await this.contentfulRepository.retornaEventos())
  }

  async retornaBlogs(): Promise<BasicResponseInterface> {
    return this.createReturn(200, await this.contentfulRepository.retornaBlogs())
  }

  async retornaNoticias(): Promise<BasicResponseInterface> {
    return this.createReturn(200, await this.contentfulRepository.retornaNoticias())
  }

  async retornaDesafios(): Promise<BasicResponseInterface> {
    return this.createReturn(200, await this.contentfulRepository.retornaDesafios())
  }

}
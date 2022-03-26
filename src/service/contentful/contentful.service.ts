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

  async retornaQuizzes(cargo): Promise<BasicResponseInterface> {
    if(cargo == 'admin') return this.createReturn(200, await this.contentfulRepository.retornaQuizzes())
    const res = await this.contentfulRepository.retornaQuizzes()
    return this.createReturn(200, res.filter(item => {
      for(let i = 0; i < item.cargo.length; i++){
        if(item.cargo[i].toLowerCase().includes(cargo.toLowerCase())) return true
      }
    }))
  }

  async retornaTrilhas(cargo): Promise<BasicResponseInterface> {
    if(cargo == 'admin') return this.createReturn(200, await this.contentfulRepository.retornaTrilhas())
    const res = await this.contentfulRepository.retornaTrilhas()
    return this.createReturn(200, res.filter(item => {
      for(let i = 0; i < item.cargo.length; i++){
        if(item.cargo[i].toLowerCase().includes(cargo.toLowerCase())) return true
      }
    }))
  }
  
  async retornaDesafios(cargo): Promise<BasicResponseInterface> {
    if(cargo == 'admin') return this.createReturn(200, await this.contentfulRepository.retornaDesafios())
    const res = await this.contentfulRepository.retornaDesafios()
    return this.createReturn(200, res.filter(item=> item.cargo.toLowerCase().includes(cargo.toLowerCase())))
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


}
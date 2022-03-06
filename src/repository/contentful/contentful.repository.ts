import { ContentfulClientApi, createClient } from "contentful"






export class ContentfulRepository {
  private contentfulClient: ContentfulClientApi

  constructor() {
    this.contentfulClient = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
      environment: process.env.CONTENTFUL_ENVIRONMENT
    }) as ContentfulClientApi
  }

  async retornaNomeProjetoContentful() {
    return (await this.contentfulClient.getSpace()).name
  }

  async retornaQuizzes(): Promise<Array<any>> {
    let contentfulRes: any = (await this.contentfulClient.getEntries({ content_type: 'quiz'})).items
    contentfulRes = contentfulRes.map(item => ({
      titulo: item.fields.titulo,
      descricao: item.fields.descricao,
      cargo: item.fields.cargo,
      tempo: item.fields.tempo,
      questoes: item.fields.questoes.map(questao => ({
        pergunta: questao.pergunta,
        respostas: questao.respostas.map(resposta => ({
          resposta: resposta.resposta,
          correta: resposta.correta
        }))
      }))
    })) 
    
    return contentfulRes
  }

  async retornaTrilhas(): Promise<Array<any>> {
    let contentfulRes: any = (await this.contentfulClient.getEntries({ content_type: 'trilha'})).items
    contentfulRes = contentfulRes.map(item => ({
      titulo: item.fields.titulo,
      descricao: item.fields.descricao,
      cargo: item.fields.cargo,
      cursos: item.fields.cursos.map(curso => ({
        titulo: curso.fields.titulo,
        descricao: curso.fields.descricao,
        pontos: curso.fields.pontos,
        link: curso.fields.link
      }))
    })) 
    
    return contentfulRes
  }

  async retornaEventos(): Promise<Array<any>> {
    let contentfulRes: any = (await this.contentfulClient.getEntries({ content_type: 'evento'})).items
    contentfulRes = contentfulRes.map(item => ({
      titulo: item.fields.titulo,
      descricao: item.fields.descricao,
      data: item.fields.data
    })) 
    
    return contentfulRes
  }

  async retornaBlogs(): Promise<Array<any>> {
    let contentfulRes: any = (await this.contentfulClient.getEntries({ content_type: 'blog'})).items
    contentfulRes = contentfulRes.map(item => ({
      titulo: item.fields.titulo,
      link: item.fields.link,
      imagem: item.fields.imagem.fields.file.url,
      descricao: item.fields.descricao,
      autor: item.fields.autor,
      stampCreated: item.fields.stampCreated
    })) 
    
    return contentfulRes
  }

  async retornaNoticias(): Promise<Array<any>> {
    let contentfulRes: any = (await this.contentfulClient.getEntries({ content_type: 'noticias'})).items
    contentfulRes = contentfulRes.map(item => ({
      titulo: item.fields.titulo,
      descricao: item.fields.descricao,
      imagem: item.fields.imagem.fields.file.url,
      link: item.fields.link,
      stampCreated: item.fields.stampCreated,
      stampAt: item.fields.stampAt
    })) 
    
    return contentfulRes
  }

  async retornaDesafios(): Promise<Array<any>> {
    let contentfulRes: any = (await this.contentfulClient.getEntries({ content_type: 'desafio'})).items
    contentfulRes = contentfulRes.map(item => ({
      titulo: item.fields.titulo,
      descricao: item.fields.descricao.content,
      ordem: item.fields.ordem,
      pontos: item.fields.pontos,
      cargo: item.fields.cargo,
      imagem: item.fields.imagem.fields.file.url
    }))
    return contentfulRes
  }
  

}
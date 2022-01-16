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

  async primeiroTesteIntegracao() {
    return {
      code: 200,
      data: (await this.contentfulClient.getSpace()).locales
    }
  }

}
import { Module } from '@nestjs/common';
import { ContentfulController } from './contentful.controller';
import { ContentfulService } from '../../service/contentful/contentful.service';
import { contentfulProviders } from 'src/repository/contentful/contentful.providers';

@Module({
  imports: [],
  controllers: [ContentfulController],
  providers: [
    ...contentfulProviders,
    ContentfulService,
  ],
  exports: [
    ...contentfulProviders,
    ContentfulService
  ],
})
export class ContentfulModule { }
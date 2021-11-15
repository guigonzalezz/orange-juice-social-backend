import { Module } from '@nestjs/common';
import { contentfulProviders } from './contentful.providers';

@Module({
  providers: [...contentfulProviders],
  exports: [...contentfulProviders],
})
export class ContentfulModule { }
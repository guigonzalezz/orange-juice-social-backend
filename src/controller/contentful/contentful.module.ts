import { Module } from '@nestjs/common';
import { ContentfulController } from './contentful.controller';
import { ContentfulService } from '../../service/contentful/contentful.service';
import { ContentfulRepository } from 'src/repository/contentful/contentful.repository';

@Module({
  imports: [],
  controllers: [ContentfulController],
  providers: [
    ContentfulRepository,
    ContentfulService
  ],
})
export class ContentfulModule { }
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UdcFeedbackNota } from './entidades/udc_feedback_nota.entity'
import { UqcFeedbackNota } from './entidades/uqc_feedback_nota.entity'
import { LogPlataforma} from './entidades/log_plataforma.entity'

@Injectable()
export class FeedbackRepository {
  constructor(
    @InjectRepository(UqcFeedbackNota)
    private uqcFeedbackRepository: Repository<UqcFeedbackNota>,
    @InjectRepository(UqcFeedbackNota)
    private udcFeedbackRepository: Repository<UdcFeedbackNota>,
    @InjectRepository(LogPlataforma)
    private logPlatarformaRepository: Repository<LogPlataforma>
  ) { }


}
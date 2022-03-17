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
    @InjectRepository(UdcFeedbackNota)
    private udcFeedbackRepository: Repository<UdcFeedbackNota>
  ) {}


  async adicionarFeedbackENotaQuiz(data) {
    const existe = await this.uqcFeedbackRepository.findOne({ where: { id_quiz: data.id_quiz, id_usuario: data.id_usuario}})
    
    if(existe) {
      await this.uqcFeedbackRepository.update({id_uqc: existe.id_uqc},{ 
        nota: data.nota,
        feedback: data.feedback != '' ? data.feedback : existe.feedback,
        id_responsavel: data.id_responsavel,
      })
    } else {
      await this.uqcFeedbackRepository.save({
        id_usuario: data.id_usuario,
        id_quiz: data.id_quiz, 
        nota: data.nota,
        feedback: data.feedback,
        id_responsavel: data.id_responsavel,
      })
    }
  }

  async adicionarFeedbackENotaDesafio(data) {
    const existe = await this.udcFeedbackRepository.findOne({ where: { id_desafio: data.id_desafio, id_usuario: data.id_usuario}})

    if(existe) {
      await this.udcFeedbackRepository.update({id_desafio: existe.id_desafio, id_usuario: existe.id_usuario},{ 
        nota: data.nota,
        feedback: data.feedback,
        id_responsavel: data.id_responsavel,
      })
    } else {
      await this.udcFeedbackRepository.save({
        id_usuario: data.id_usuario,
        id_desafio: data.id_desafio, 
        nota: data.nota,
        feedback: data.feedback,
        id_responsavel: data.id_responsavel,
      })
    }
  }

  async enviarQuizFeedbackNota(data){
    await this.uqcFeedbackRepository.update({
      id_usuario: data.id_usuario,
      id_quiz: data.id_quiz, 
    },{
      feedback: data.feedback,
      id_responsavel: data.id_responsavel,
    })
  }

  async enviarDesafioFeedbackNota(data){
    await this.udcFeedbackRepository.save({
      id_usuario: data.id_usuario,
      id_desafio: data.id_desafio, 
      nota: data.nota,
      feedback: data.feedback,
      id_responsavel: data.id_responsavel,
    })
  }

  async carregarFeedbackDesafiosEnviados(){
    return await this.udcFeedbackRepository.find()
  } 

  async carregarFeedbackQuizzesEnviados(){
    return await this.uqcFeedbackRepository.find()
  }
}
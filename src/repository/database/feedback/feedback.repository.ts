import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UdcFeedbackNota } from './entidades/udc_feedback_nota.entity'

@Injectable()
export class FeedbackRepository {
  constructor(
    @InjectRepository(UdcFeedbackNota)
    private udcFeedbackRepository: Repository<UdcFeedbackNota>
  ) {}


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
    return await this.udcFeedbackRepository.find({select:["id_udc", "stamp_created", "id_desafio", "nota","feedback"]})
  } 

  async carregarFeedbackDesafiosEnviadosUsuarioId(id_usuario){
    return await this.udcFeedbackRepository.find({where:{id_usuario}, select:["id_udc", "stamp_created", "id_desafio", "nota","feedback", "id_usuario"]})
  }

}
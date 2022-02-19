import { Entity, Column, BaseEntity } from 'typeorm';

@Entity("uqc_feedback_nota")
export class UqcFeedbackNota extends BaseEntity {

  @Column()
  stamp_created: Date; 

  @Column()
  nota: number;
  
  @Column()
  feedback: string;
  
  @Column()
  id_responsavel: number;

  @Column()
  id_usuario: number;
  
  @Column()
  id_quiz: number;
}
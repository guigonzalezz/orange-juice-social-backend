import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("udc_feedback_nota")
export class UdcFeedbackNota extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_udc: number;

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
  id_desafio: number;

}
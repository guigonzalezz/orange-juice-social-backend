import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("udc_feedback_nota")
export class UdcFeedbackNota extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_udc: number;

  @Column({default: () => 'CURRENT_TIMESTAMP' })
  stamp_created: Date; 

  @Column({default: 0})
  nota: number;
  
  @Column({default:''})
  feedback: string;
  
  @Column({default: 0})
  id_responsavel: number;

  @Column({default: 0})
  id_usuario: number;
  
  @Column({default: 0})
  id_desafio: number;

}
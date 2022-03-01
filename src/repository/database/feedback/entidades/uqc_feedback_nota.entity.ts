import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("uqc_feedback_nota")
export class UqcFeedbackNota extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_uqc: number;

  @Column({default: () => 'CURRENT_TIMESTAMP' })
  stamp_created: Date; 

  @Column({default: 0})
  nota: number;
  
  @Column({default: ''})
  feedback: string;
  
  @Column({default: 0})
  id_responsavel: number;

  @Column({default: 0})
  id_usuario: number;
  
  @Column({default: 0})
  id_quiz: number;
}
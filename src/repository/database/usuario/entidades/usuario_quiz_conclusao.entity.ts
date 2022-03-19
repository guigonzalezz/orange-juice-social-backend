import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
@Entity("usuario_quiz_conclusao")
export class UsuarioQuizConclusao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_usuario_quiz_conclusao: number;

  @Column()
  id_usuario: number;

  @Column()
  quiz_nome: string;

  @Column({ length: 1 })
  feedback_recebido_sn: string;
  
  @Column()
  anotacao: string;
}
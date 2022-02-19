import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
@Entity("usuario_quiz_conclusao")
export class UsuarioQuizConclusao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_usuario_quiz_conclusao: number;

  @Column()
  id_usuario: number;

  @Column()
  id_quiz: number;

  @Column({ length: 1 })
  concluido_SN: string;
  
  @Column()
  anotacao: string;
}
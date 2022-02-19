import { Entity, Column, BaseEntity } from 'typeorm';
@Entity("usuario_quiz_conclusao")
export class UsuarioQuizConclusao extends BaseEntity {
  @Column()
  id_usuario: number;

  @Column()
  id_quiz: number;

  @Column({ length: 1 })
  concluido_SN: string;
  
  @Column()
  anotacao: string;
}
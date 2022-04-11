import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("usuario_quiz_resposta")
export class UsuarioQuizResposta extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_usuario_quiz_resposta: number;

  @Column()
  id_usuario_quiz_pergunta: number;

  @Column()
  id_usuario_quiz_conclusao: number;

  @Column()
  resposta: string;
}
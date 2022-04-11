import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("usuario_quiz_pergunta")
export class UsuarioQuizPergunta extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_usuario_quiz_pergunta: number;

  @Column()
  id_usuario_quiz_conclusao: number;

  @Column()
  pergunta: string;

  @Column()
  acertou: boolean;

}
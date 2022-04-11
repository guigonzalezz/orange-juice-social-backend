import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
@Entity("usuario_quiz_conclusao")
export class UsuarioQuizConclusao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_usuario_quiz_conclusao: number;

  @Column()
  id_usuario: number;

  @Column({default: 0})
  nota: number;

  @Column({default:''})
  quiz_nome: string;

  @Column({default: ''})
  tempo_realizado: string;

  @Column({default: () => 'CURRENT_TIMESTAMP' })
  stamp_created: Date;
  
  @Column({default:''})
  anotacao: string;
}
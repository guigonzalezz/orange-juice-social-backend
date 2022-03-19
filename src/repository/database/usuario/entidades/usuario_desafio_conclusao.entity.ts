import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
@Entity("usuario_desafio_conclusao")
export class UsuarioDesafioConclusao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_usuario_desafio_conclusao: number;

  @Column()
  id_usuario: number;

  @Column()
  desafio_nome: string;

  @Column()
  desafio_url: string;

  @Column({ default: ''})
  categoria: string;

  @Column({default: () => 'CURRENT_TIMESTAMP' })
  stamp_enviado: Date;

  @Column({ length: 1 })
  feedback_recebido_SN: string;
  
  @Column()
  anotacao: string;
}
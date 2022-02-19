import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
@Entity("usuario_desafio_conclusao")
export class UsuarioDesafioConclusao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_usuario_desafio_conclusao: number;

  @Column()
  id_usuario: number;

  @Column()
  id_desafio: number;

  @Column({ length: 1 })
  concluido_SN: string;
  
  @Column()
  anotacao: string;
}
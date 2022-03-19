import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
@Entity("usuario_curso_conclusao")
export class UsuarioCursoConclusao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_usuario_curso_conclusao: number;

  @Column()
  id_usuario: number;

  @Column()
  curso_nome: string;

  @Column({ length: 1 })
  concluido_SN: string;
  
  @Column()
  anotacao: string;
}
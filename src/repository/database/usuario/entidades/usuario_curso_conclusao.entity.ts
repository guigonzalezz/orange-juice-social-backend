import { Entity, Column, BaseEntity } from 'typeorm';
@Entity("usuario_curso_conclusao")
export class UsuarioCursoConclusao extends BaseEntity {
  @Column()
  id_usuario: number;

  @Column()
  id_curso: number;

  @Column({ length: 1 })
  concluido_SN: string;
  
  @Column()
  anotacao: string;
}
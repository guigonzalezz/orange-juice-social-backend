import { Entity, Column, BaseEntity } from 'typeorm';
@Entity("usuario_trilha_conclusao")
export class UsuarioTrilhaConclusao extends BaseEntity {
  @Column()
  id_usuario: number;

  @Column()
  id_trilha: number;

  @Column({ length: 1 })
  concluido_SN: string;
  
  @Column()
  anotacao: string;
}
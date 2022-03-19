import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
@Entity("usuario_trilha_conclusao")
export class UsuarioTrilhaConclusao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_usuario_trilha_conclusao: number;

  @Column()
  id_usuario: number;

  @Column()
  trilha_nome: string;

  @Column({ length: 1 })
  concluido_SN: string;
  
  @Column()
  anotacao: string;
}
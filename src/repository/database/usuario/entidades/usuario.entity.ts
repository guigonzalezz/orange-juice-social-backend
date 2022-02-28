import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
@Entity("usuario")
export class UsuarioV2 extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  id_cargo: number;

  @Column({ length: 1 })
  ativo_SN: string;

  @Column({ length: 1 })
  colaborador_SN: string;

  @Column({default: () => 'CURRENT_TIMESTAMP' })
  stamp_created: Date;

  @Column({ nullable: true })
  stamp_disable: Date;

}
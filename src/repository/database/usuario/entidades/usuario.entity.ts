import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
@Entity()
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  id_cargo: number;

  @Column({ length: 1 })
  ativo_SN: string;

  @Column({ length: 1 })
  colaborador_SN: string;

  @Column()
  stamp_created: Date;

  @Column({ nullable: true })
  stamp_disable: Date;

}
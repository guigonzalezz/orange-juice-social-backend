import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
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

  @Column()
  stamp_disable: Date;
}
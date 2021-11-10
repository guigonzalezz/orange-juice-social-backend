import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Cargo extends BaseEntity {

  @PrimaryGeneratedColumn()
  id_cargo: number;

  @Column({ length: 90 })
  nome: string;
}
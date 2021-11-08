import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cargo {

  @PrimaryGeneratedColumn()
  id_cargo: number;

  @Column({ length: 90 })
  nome: string;
}
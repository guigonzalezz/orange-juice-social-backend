import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class CargoV2 extends BaseEntity {

  @PrimaryGeneratedColumn()
  id_cargo: number;

  @Column({ length: 90 })
  nome: string;
}
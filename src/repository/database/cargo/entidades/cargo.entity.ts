import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity("cargo")
export class CargoV2 extends BaseEntity {

  @PrimaryGeneratedColumn()
  id_cargo: number;

  @Column({ length: 90 })
  nome: string;

  @Column({ length: 1, default: 'S' })
  ativo_SN: string;

}
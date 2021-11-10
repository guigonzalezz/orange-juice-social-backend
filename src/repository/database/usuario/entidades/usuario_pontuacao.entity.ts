import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class UsuarioPontuacao extends BaseEntity {

  @PrimaryGeneratedColumn()
  id_pontuacao: number;

  @Column()
  id_usuario: number;

  @Column()
  pontos: number;
}
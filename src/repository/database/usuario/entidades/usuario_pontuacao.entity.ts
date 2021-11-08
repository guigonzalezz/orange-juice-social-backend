import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsuarioPontuacao {

  @PrimaryGeneratedColumn()
  id_pontuacao: number;

  @Column()
  id_usuario: number;

  @Column()
  pontos: number;
}
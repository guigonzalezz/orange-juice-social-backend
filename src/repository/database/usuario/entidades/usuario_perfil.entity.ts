import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario_perfil {

  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ length: 90 })
  nome: string;

  @Column({ length: 50 })
  email: string;

  @Column()
  data_nasc: Date;

  @Column({ length: 14 })
  contato: string;

  @Column({ length: 100 })
  senha: string;

  @Column({ length: 11 })
  cpf: string;

  @Column({ length: 35 })
  cidade: string;

  @Column({ length: 35 })
  estado: string;

  @Column({ length: 35 })
  pais: string;
}
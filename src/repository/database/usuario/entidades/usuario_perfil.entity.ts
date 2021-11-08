import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as crypto from 'crypto';

@Entity()
export class UsuarioPerfil {

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

  @BeforeInsert()
  hashPassword() {
    this.senha = crypto.createHmac('sha256', this.senha).digest('hex');
  }

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
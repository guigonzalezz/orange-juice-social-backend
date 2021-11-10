import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BaseEntity } from 'typeorm';
import * as crypto from 'crypto';

@Entity()
export class UsuarioPerfil extends BaseEntity {

  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ length: 90 })
  nome: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 50 })
  email_empresarial: string;


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
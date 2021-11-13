import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import * as crypto from 'crypto';
import { Usuario } from './usuario.entity';

@Entity()
export class UsuarioPerfil extends BaseEntity {

  @PrimaryGeneratedColumn()
  id_usuario_perfil: number;

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

  @Column({ nullable: true })
  id_usuario: number;

  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario
}



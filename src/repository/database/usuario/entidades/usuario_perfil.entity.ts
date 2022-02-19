import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './usuario.entity';

@Entity("usuario_perfil")
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
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.senha = await bcrypt.hash(this.senha, salt);
  }

  @Column({ length: 100, select: false})
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



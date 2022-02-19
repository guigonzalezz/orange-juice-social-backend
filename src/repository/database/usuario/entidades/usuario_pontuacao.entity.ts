import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity("usuario_pontuacao")
export class UsuarioPontuacao extends BaseEntity {

  @PrimaryGeneratedColumn()
  id_pontuacao: number;

  @Column()
  pontos: number;

  @Column({ nullable: true })
  id_usuario: number;

  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario
}
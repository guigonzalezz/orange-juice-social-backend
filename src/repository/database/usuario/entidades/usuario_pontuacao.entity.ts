import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { UsuarioV2 } from './usuario.entity';

@Entity("usuario_pontuacao")
export class UsuarioPontuacao extends BaseEntity {

  @PrimaryGeneratedColumn()
  id_pontuacao: number;

  @Column()
  pontos: number;

  @Column({ nullable: true })
  id_usuario: number;

  @OneToOne(() => UsuarioV2)
  @JoinColumn({ name: 'id_usuario' })
  usuario: UsuarioV2
}
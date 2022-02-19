import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity("usuario_social")
export class UsuarioSocial extends BaseEntity {

  @PrimaryGeneratedColumn()
  id_usuario_social: number;

  @Column()
  seguidores: string;//JSON;

  @Column()
  seguindo: string;//JSON;

  @Column()
  timeline_acoes: string;//JSON;

  @Column()
  quizzes_concluidos: number;

  @Column()
  desafios_concluidos: number;

  @Column()
  cursos_concluidos: number;

  @Column()
  trilhas_concluidos: number;

  @Column()
  sobre: string;

  @Column()
  titulo: string;

  @Column({ length: 100 })
  github_link: string;

  @Column({ length: 100 })
  linkedin_link: string;

  @Column({ length: 100 })
  instagram_link: string;

  @Column({ length: 100 })
  stackoverflow_link: string;

  @Column({ length: 100 })
  facebook_link: string;

  @Column()
  avatar: string;

  @Column()
  banner: string;

  @Column()
  experiencia: string;//JSON;

  @Column()
  formacao: string;//JSON;

  @Column({ nullable: true })
  id_usuario: number;

  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario
}
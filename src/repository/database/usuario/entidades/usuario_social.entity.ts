import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { UsuarioV2 } from './usuario.entity';

@Entity("usuario_social")
export class UsuarioSocial extends BaseEntity {

  @PrimaryGeneratedColumn()
  id_usuario_social: number;

  @Column({default: 0})
  seguidores: number;//JSON;

  @Column({default: 0})
  seguindo: number;//JSON;

  @Column({default: ''})
  timeline_acoes: string;//JSON;

  @Column({default: 0})
  quizzes_concluidos: number;

  @Column({default: 0})
  desafios_concluidos: number;

  @Column({default: 0})
  cursos_concluidos: number;

  @Column({default: 0})
  trilhas_concluidos: number;

  @Column({default: ''})
  sobre: string;

  @Column({default: ''})
  titulo: string;

  @Column({ default: '', length: 100 })
  github_link: string;

  @Column({ default: '', length: 100 })
  linkedin_link: string;

  @Column({ default: '', length: 100 })
  instagram_link: string;

  @Column({ default: '', length: 100 })
  stackoverflow_link: string;

  @Column({ default: '', length: 100 })
  facebook_link: string;

  @Column({default: ''})
  avatar: string;

  @Column({default: ''})
  banner: string;

  @Column({default: ''})
  experiencia: string;//JSON;

  @Column({default: ''})
  formacao: string;//JSON;

  @Column({ nullable: false })
  id_usuario: number;

  @OneToOne(() => UsuarioV2)
  @JoinColumn({ name: 'id_usuario' })
  usuario: UsuarioV2
}
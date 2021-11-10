import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class UsuarioSocial extends BaseEntity {

  @PrimaryGeneratedColumn()
  id_usuario: number;

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

  @Column("blob", { nullable: true })
  avatar

  @Column("blob", { nullable: true })
  banner

  @Column()
  experiencia: string;//JSON;

  @Column()
  formacao: string;//JSON;
}
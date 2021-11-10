import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne } from 'typeorm';
import { Cargo } from '../../cargo/entidades/cargo.entity';
import { UsuarioPerfil } from './usuario_perfil.entity';
import { UsuarioPontuacao } from './usuario_pontuacao.entity';
import { UsuarioSocial } from './usuario_social.entity';

@Entity()
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  id_cargo: number;

  @Column({ length: 1 })
  ativo_SN: string;

  @Column({ length: 1 })
  colaborador_SN: string;

  @Column()
  stamp_created: Date;

  @Column()
  stamp_disable: Date;

  @OneToOne(type => Cargo, cargo => cargo.id_cargo)
  cargo: Cargo

  @OneToOne(type => UsuarioPerfil, perfil => perfil.id_usuario)
  perfil: UsuarioPerfil

  @OneToOne(type => UsuarioSocial, social => social.id_usuario)
  social: UsuarioSocial

  @OneToOne(type => UsuarioPontuacao, pontos => pontos.id_usuario)
  pontos: UsuarioPontuacao
}
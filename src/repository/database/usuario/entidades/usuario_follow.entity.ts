import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { UsuarioSocial } from './usuario_social.entity';

@Entity("usuario_follow")
export class UsuarioFollow extends BaseEntity {

  @PrimaryGeneratedColumn()
  id_follow: number

  @Column({ comment: 'Id usuario social da pessoa seguida' })
  seguido: number

  @Column({ comment: 'Id usuario social da pessoa que segue' })
  seguidor: number

  @Column({default: () => 'CURRENT_TIMESTAMP' })
  stamp_created: Date
}
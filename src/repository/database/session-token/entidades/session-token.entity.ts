import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
@Entity()
export class SessionToken {
  @PrimaryGeneratedColumn()
  id_token: number;

  @Column({ length: 255 })
  hash: string;

  @Column({ length: 50 })
  email_empresarial: string;
}
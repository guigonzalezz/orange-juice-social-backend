import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
@Entity("session_token")
export class SessionTokenV2 {
  @PrimaryGeneratedColumn()
  id_token: number;

  @Column({ length: 255 })
  hash: string;

  @Column({ length: 50 })
  email_empresarial: string;
}
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("log_plataforma")
export class LogPlataforma extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_log: number;
  
  @Column()
  stamp_modified: Date;

  @Column()
  id_responsavel: number;
  
  @Column()
  nota: number;

  @Column()
  feedback: string;

  @Column()
  id_desafio: number;
  
  @Column()
  id_quiz: number;

}
import { Entity, Column, BaseEntity } from 'typeorm';

@Entity()
export class LogPlataforma extends BaseEntity {
  
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
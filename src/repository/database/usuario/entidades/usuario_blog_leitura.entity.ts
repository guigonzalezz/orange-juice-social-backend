import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
@Entity("usuario_blog_leitura")
export class UsuarioBlogLeitura extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_usuario_blog_leitura: number;

  @Column()
  id_usuario: number;

  @Column()
  blog_nome: string;

  @Column({ length: 1 })
  concluido_SN: string;
  
  @Column()
  anotacao: string;
}
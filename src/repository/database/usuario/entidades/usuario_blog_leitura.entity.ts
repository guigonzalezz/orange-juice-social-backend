import { Entity, Column, BaseEntity } from 'typeorm';
@Entity("usuario_blog_leitura")
export class UsuarioBlogLeitura extends BaseEntity {
  @Column()
  id_usuario: number;

  @Column()
  id_blog: number;

  @Column({ length: 1 })
  concluido_SN: string;
  
  @Column()
  anotacao: string;
}
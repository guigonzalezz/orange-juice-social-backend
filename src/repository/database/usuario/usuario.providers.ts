import { Connection } from 'typeorm';
import { Usuario } from './entidades/usuario.entity';
import { UsuarioBlogLeitura } from './entidades/usuario_blog_leitura.entity';
import { UsuarioCursoConclusao } from './entidades/usuario_curso_conclusao.entity';
import { UsuarioDesafioConclusao } from './entidades/usuario_desafio_conclusao.entity';
import { UsuarioPerfil } from './entidades/usuario_perfil.entity';
import { UsuarioPontuacao } from './entidades/usuario_pontuacao.entity';
import { UsuarioQuizConclusao } from './entidades/usuario_quiz_conclusao.entity';
import { UsuarioSocial } from './entidades/usuario_social.entity';
import { UsuarioTrilhaConclusao } from './entidades/usuario_trilha_conclusao.entity';

export const usuarioProviders = [
  {
    provide: 'USUARIO_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Usuario),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USUARIO_PERFIL_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(UsuarioPerfil),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USUARIO_SOCIAL_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(UsuarioSocial),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USUARIO_PONTUACAO_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(UsuarioPontuacao),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USUARIO_BLOG_LEITURA_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(UsuarioBlogLeitura),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USUARIO_TRILHA_CONCLUSAO_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(UsuarioTrilhaConclusao),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USUARIO_QUIZ_CONCLUSAO_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(UsuarioQuizConclusao),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USUARIO_DESAFIO_CONCLUSAO_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(UsuarioDesafioConclusao),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USUARIO_CURSO_CONCLUSAO_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(UsuarioCursoConclusao),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USUARIO_BLOG_LEITURA_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(UsuarioBlogLeitura),
    inject: ['DATABASE_CONNECTION'],
  },
];
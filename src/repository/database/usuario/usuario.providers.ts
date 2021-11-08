import { Connection } from 'typeorm';
import { Usuario } from './entidades/usuario.entity';
import { UsuarioPerfil } from './entidades/usuario_perfil.entity';
import { UsuarioPontuacao } from './entidades/usuario_pontuacao.entity';
import { UsuarioSocial } from './entidades/usuario_social.entity';

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
];
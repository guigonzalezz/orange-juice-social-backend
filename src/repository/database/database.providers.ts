import { createConnection } from 'typeorm';
import { Cargo } from './cargo/entidades/cargo.entity';
import { Usuario } from './usuario/entidades/usuario.entity';
import { UsuarioPerfil } from './usuario/entidades/usuario_perfil.entity';
import { UsuarioPontuacao } from './usuario/entidades/usuario_pontuacao.entity';
import { UsuarioSocial } from './usuario/entidades/usuario_social.entity';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        entities: [Usuario, UsuarioPerfil, UsuarioSocial, UsuarioPontuacao, Cargo],
        synchronize: true,
      }),
  },
];

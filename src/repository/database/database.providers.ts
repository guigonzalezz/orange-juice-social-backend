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
        host: 'cis9cbtgerlk68wl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        port: 3306,
        username: 'k0zhw26ohj06kuf4',
        password: 'zqkftuhc320wd7qw',
        database: 'onnzvvnbnuvwplfs',
        entities: [Usuario, UsuarioPerfil, UsuarioSocial, UsuarioPontuacao, Cargo],
        synchronize: true,
      }),
  },
];

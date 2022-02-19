import { createConnection } from 'typeorm';
import { Cargo } from './cargo/entidades/cargo.entity';
import { LogPlataforma } from './feedback/entidades/log_plataforma.entity';
import { UdcFeedbackNota } from './feedback/entidades/udc_feedback_nota.entity';
import { UqcFeedbackNota } from './feedback/entidades/uqc_feedback_nota.entity';
import { SessionToken } from './session-token/entidades/session-token.entity';
import { Usuario } from './usuario/entidades/usuario.entity';
import { UsuarioBlogLeitura } from './usuario/entidades/usuario_blog_leitura.entity';
import { UsuarioCursoConclusao } from './usuario/entidades/usuario_curso_conclusao.entity';
import { UsuarioDesafioConclusao } from './usuario/entidades/usuario_desafio_conclusao.entity';
import { UsuarioPerfil } from './usuario/entidades/usuario_perfil.entity';
import { UsuarioPontuacao } from './usuario/entidades/usuario_pontuacao.entity';
import { UsuarioQuizConclusao } from './usuario/entidades/usuario_quiz_conclusao.entity';
import { UsuarioSocial } from './usuario/entidades/usuario_social.entity';
import { UsuarioTrilhaConclusao } from './usuario/entidades/usuario_trilha_conclusao.entity';

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
        entities: [
          Usuario, UsuarioPerfil, UsuarioSocial, 
          UsuarioPontuacao, Cargo, SessionToken,
          UsuarioBlogLeitura, UsuarioDesafioConclusao, UsuarioQuizConclusao,
          UsuarioCursoConclusao, UsuarioTrilhaConclusao, UdcFeedbackNota,
          UqcFeedbackNota, LogPlataforma
        ],
        synchronize: true,
      }),
  },
];

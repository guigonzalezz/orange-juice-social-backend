import { Connection } from 'typeorm';
import { SessionToken } from './entidades/session-token.entity';

export const sessionTokenProviders = [
  {
    provide: 'SESSION_TOKEN_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(SessionToken),
    inject: ['DATABASE_CONNECTION'],
  },
];
import { Connection } from 'typeorm';
import { Cargo } from './entidades/cargo.entity';

export const cargoProviders = [
  {
    provide: 'CARGO_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Cargo),
    inject: ['DATABASE_CONNECTION'],
  },
];
import { Connection } from 'typeorm';
import { LogPlataforma } from './entidades/log_plataforma.entity';
import { UdcFeedbackNota } from './entidades/udc_feedback_nota.entity';
import { UqcFeedbackNota } from './entidades/uqc_feedback_nota.entity';


export const cargoProviders = [
  {
    provide: 'LOG_PLATAFORMA_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(LogPlataforma),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'UDC_FEEDBACK_NOTA_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(UdcFeedbackNota),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'UQC_FEEDBACK_NOTA_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(UqcFeedbackNota),
    inject: ['DATABASE_CONNECTION'],
  },
];
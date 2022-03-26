import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RelatorioController } from './relatorio.controller';
import { UsuarioService } from '../../service/usuario/usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/infraestructure/auth/jwt.strategy';
import { UsuarioRepository } from 'src/repository/database/usuario/usuario.repository';
import { UsuarioV2 } from 'src/repository/database/usuario/entidades/usuario.entity';
import { UsuarioPerfil } from 'src/repository/database/usuario/entidades/usuario_perfil.entity';
import { UsuarioSocial } from 'src/repository/database/usuario/entidades/usuario_social.entity';
import { UsuarioPontuacao } from 'src/repository/database/usuario/entidades/usuario_pontuacao.entity';
import { CargoModule } from '../cargo/cargo.module';
import { CargoRepository } from 'src/repository/database/cargo/cargo.repository';
import { UsuarioFollow } from 'src/repository/database/usuario/entidades/usuario_follow.entity';
import { UsuarioDesafioConclusao } from 'src/repository/database/usuario/entidades/usuario_desafio_conclusao.entity';
import { UsuarioQuizConclusao } from 'src/repository/database/usuario/entidades/usuario_quiz_conclusao.entity';
import { UsuarioTrilhaConclusao } from 'src/repository/database/usuario/entidades/usuario_trilha_conclusao.entity';
import { UsuarioBlogLeitura } from 'src/repository/database/usuario/entidades/usuario_blog_leitura.entity';
import { UsuarioCursoConclusao } from 'src/repository/database/usuario/entidades/usuario_curso_conclusao.entity';
import { FeedbackRepository } from 'src/repository/database/feedback/feedback.repository';
import { LogPlataforma } from 'src/repository/database/feedback/entidades/log_plataforma.entity';
import { UdcFeedbackNota } from 'src/repository/database/feedback/entidades/udc_feedback_nota.entity';
import { UqcFeedbackNota } from 'src/repository/database/feedback/entidades/uqc_feedback_nota.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    UsuarioV2, UsuarioPerfil, UsuarioSocial, 
    UsuarioPontuacao, UsuarioFollow, UsuarioDesafioConclusao,
    UsuarioQuizConclusao, UsuarioBlogLeitura, UsuarioCursoConclusao,
    UsuarioTrilhaConclusao, UdcFeedbackNota, UqcFeedbackNota
  ]), HttpModule, CargoModule],
  controllers: [RelatorioController],
  providers: [
    JwtStrategy,
    UsuarioService,
    UsuarioRepository,
    FeedbackRepository,
    CargoRepository
  ],
  exports: [UsuarioService, TypeOrmModule],
})
export class RelatorioModule { }
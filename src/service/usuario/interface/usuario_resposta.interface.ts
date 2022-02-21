import { CargoInterface } from "src/service/cargo/interface/cargo.interface";
import { UsuarioPerfilInterface } from "./usuario_perfil.interface";
import { UsuarioPontuacaoInterface } from "./usuario_pontuacao.interface";
import { UsuarioSocialInterface } from "./usuario_social.interface";

export interface UsuarioRespostaInterface {
  id_usuario: number
  ativo_SN: string
  colaborador_SN: string
  stamp_created: Date
  perfil: UsuarioPerfilInterface
  cargo: string | CargoInterface
  social: UsuarioSocialInterface
  pontos: number | UsuarioPontuacaoInterface
  feedback?: any//FeedbacksInterface
}
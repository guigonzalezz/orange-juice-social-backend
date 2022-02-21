import { CargoDto } from "src/controller/cargo/dto/cargo.dto";
import { UsuarioPerfilDto } from "./usuario_perfil.dto";
import { UsuarioPontuacaoDto } from "./usuario_pontuacao.dto";
import { UsuarioSocialDto } from "./usuario_social.dto";




export interface UsuarioRespostaDto {
  id_usuario: number;
  ativo_SN: string;
  colaborador_SN: string;
  stamp_created: Date;
  perfil: UsuarioPerfilDto
  cargo: string | CargoDto;
  social: UsuarioSocialDto;
  pontos: number | UsuarioPontuacaoDto;
  feedback?: any;//FeedbacksDto;
}
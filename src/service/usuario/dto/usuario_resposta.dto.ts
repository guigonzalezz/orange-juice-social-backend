import { CargoDto } from "src/service/cargo/dto/cargo.dto";
import { UsuarioPerfilDto } from "./usuario_perfil.dto";
import { UsuarioSocialDto } from "./usuario_social.dto";




export interface UsuarioRespostaDto {
  id_usuario: number;
  ativo_SN: string;
  colaborador_SN: string;
  stamp_created: Date;
  perfil: UsuarioPerfilDto
  cargo: string;
  social: UsuarioSocialDto;
  pontos: number;
  feedback: any;//FeedbacksDto;
}
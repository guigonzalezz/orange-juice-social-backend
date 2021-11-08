import { Blob } from "buffer";


export interface UsuarioSocialDto {
  seguidores: string;
  seguindo: string;
  timeline_acoes: string;
  quizzes_concluidos: number;
  desafios_concluidos: number;
  cursos_concluidos: number;
  trilhas_concluidos: number;
  sobre: string;
  github_link: string;
  linkedin_link: string;
  instagram_link: string;
  stackoverflow_link: string;
  facebook_link: string;
  avatar: Blob;
  banner: Blob;
  titulo: string;
  experiencia: string;
  formacao: string;
}
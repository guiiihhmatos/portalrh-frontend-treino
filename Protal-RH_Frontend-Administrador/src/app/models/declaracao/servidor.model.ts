import { Retificacoes } from './retificacoes.model';
export class Servidor
{
  id?: number;
  matricula?: number;
  cpf?: string;
  nome?: string;
  email?: string;
  secretaria?: string;
  localTrabalho?: string;
  cargo?: string;
  exercicio?: number;
  dtAtualizacao?: Date;
  declaracao?: string;
  retificacoes?: Retificacoes[];
  motivoRetificacao?: string;
}

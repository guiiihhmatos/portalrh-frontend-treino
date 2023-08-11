import { AndamentoServidor } from './andamento.model';
import { Dependente } from './dependentes.model';
export interface Servidor {
  matricula: number;
  nome: string;
  rg: string;
  dtNascimento: Date;
  dtAdmissao: Date;
  formacaoSuperior: string;
  nomeConjuge: string | null;
  nomeSocial: string | null;
  sexo: 'M' | 'F';
  email: string;
  telefone: number;
  racaCor: number;
  cpf: string;
  tipoLogradouro: string;
  endereco: string;
  numeroEndereco: string;
  complementoEndereco: string | null;
  bairro: string;
  cep: string;
  municipio: number;
  estadoCivil: number;
  grauInstrucao: string;
  cargo: string;
  localTrabalho: string;
  secretaria: string;
  descStatusRh: string;
  dependentes: Dependente;
  andamentos: AndamentoServidor[];
}

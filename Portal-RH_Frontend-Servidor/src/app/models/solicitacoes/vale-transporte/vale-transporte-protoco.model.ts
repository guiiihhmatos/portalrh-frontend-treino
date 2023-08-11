import { DadosEmpresaVT } from "./vale-transporte.model";

export interface ProtocoloValeTransporte {
  id: number;
  matricula: number;
  cpf: string;
  rg: string;
  nome: string;
  localTrabalho: string;
  cargo: string;
  operacao: string;
  cep: string;
  endereco: string;
  bairro: string;
  municipio: string;
  numeroEndereco: string;
  complementoEndereco: string;
  cartaoTransporte: string;
  empresas: DadosEmpresaVT[];
  dtPedido: Date;
  concluido: boolean;
  dtAtendido: Date;
  andamento: AndamentoVT[];
}
export interface AndamentoVT {
  id: number;
  dataOcorrencia: Date;
  observacao: string;
}

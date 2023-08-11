export interface ProtocoloRequisicaoDeclaracao {
  id: number;
  matricula: number;
  cpf: string;
  rg: string;
  nome: string;
  telefone: string;
  email: string;
  dtPedido: Date;
  tipo: string;
  concluido: boolean;
  dtAtendido: Date;
  andamento: AndamentoRD[];
}
export interface AndamentoRD {
  id: number;
  dataOcorrencia: Date;
  observacao: string;
}

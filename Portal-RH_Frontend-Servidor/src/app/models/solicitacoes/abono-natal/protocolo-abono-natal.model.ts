export interface ProtocoloAbonoNatal {
  id: number;
  matricula: number;
  cpf: string;
  nome: string;
  dtPedido: Date;
  exercicio: number;
  dtAniversario: Date;
  andamento: AndamentoAbono[];
}
export interface AndamentoAbono {
  id: number;
  dataOcorrencia: Date;
  observacao: string;
}

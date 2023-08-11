export interface ProtocoloContagemQuinquenio {
  id: number;
  matricula: number;
  cpf: string;
  nome: string;
  endereco: string;
  bairro: string;
  cidade: string;
  cargo: string;
  secretaria: string;
  telefone: string;
  dtPedido: Date;
  periodo: string;
  concluido: boolean;
  andamento: AndamentoCQ[];
}
export interface AndamentoCQ {
  id: number;
  dataOcorrencia: Date;
  observacao: string;
}

export interface ProtocoloReducaoCH {
  id: number;
  matricula: number;
  cpf: string;
  rg: string;
  nome: string;
  localTrabalho: string;
  cargo: string;
  cep: string;
  endereco: string;
  bairro: string;
  municipio: string;
  numeroEndereco: string;
  complementoEndereco: string;
  tipo: string;
  conteudo: string;
  dtPedido: Date;
  concluido: boolean;
  dtAtendido: Date;
  andamento: AndamentoReducaoCH[];
}
export interface AndamentoReducaoCH {
  id: number;
  dataOcorrencia: Date;
  observacao: string;
}

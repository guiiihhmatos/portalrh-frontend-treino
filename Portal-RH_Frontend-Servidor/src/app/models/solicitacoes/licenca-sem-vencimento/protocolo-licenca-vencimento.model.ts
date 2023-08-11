export interface ProtocoloLicencaSV {
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
  conteudo: string;
  dtPedido: Date;
  concluido: boolean;
  dtAtendido: Date;
  andamento: AndamentoLSV[];
  contribuicao: boolean;
}
export interface AndamentoLSV{
  id: number;
  dataOcorrencia: Date;
  observacao: string;
}

export interface ValeTransporte {
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
}
export interface DadosEmpresaVT {
  empresaTransportadora: string;
  tarifa: number;
  valorTotal: number;
}

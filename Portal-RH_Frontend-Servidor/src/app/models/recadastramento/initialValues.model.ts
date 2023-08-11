export interface InitialValues {
  nome: string;
  grauInstrucao: string;
  formacaoSuperior: string;
  estadoCivil: number;
  nomeConjuge: string | null;
  cep: {
    cep: string;
    tipoLogradouro: string;
    endereco: string;
    numero: string;
    complemento: string | null;
    municipio: number;
    bairro: string
  };
}

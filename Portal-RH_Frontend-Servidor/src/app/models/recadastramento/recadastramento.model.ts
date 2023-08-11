export interface Recadastramento {
  dtNascimento: Date;
  rg: string;
  matricula: number;
  cpf: string;
  nome: string;
  nomeSocial: string;
  racaCor: number;
  telefone: string;
  email: string;
  nomeConjuge: string;
  estadoCivil: number;
  cep: string;
  tipoLogradouro: string;
  endereco: string;
  numeroEndereco: string;
  complementoEndereco: string;
  bairro: string;
  municipio: number;
  secretaria: string;
  localTrabalho: string;
  cargo: string;
  grauInstrucao: string;
  dependentes: [
    {
      nome: string;
      dtNascimento: Date;
      sexo: string;
      cpf: string;
      servidor: string;
      matricula: number;
      idFb: number;
    }
  ];
  deficiente: true;
  observacaoDeficiencia: string;
  validador: string;
  motivoInvalidacao: string;
  formacaoSuperior: string;
  dependentesList: [
    {
      nome: string;
      dtNascimento: Date;
      sexo: string;
      cpf: string;
      servidor: string;
      matricula: number;
      idFb: number;
    }
  ];
  motivoRmDep: [string];
}

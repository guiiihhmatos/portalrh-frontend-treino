export interface ProtocoloDeclaracaoBens {
  id: 0;
  matricula: 0;
  cpf: string;
  nome: string;
  email: string;
  secretaria: string;
  localTrabalho: string;
  exercicio: 0;
  dtAtualizacao: Date;
  tipo: string;
  retificacoes: [
    {
      id: 0;
      declaracao: string;
      motivo: string;
      dataRetificacao: Date;
    }
  ];
}

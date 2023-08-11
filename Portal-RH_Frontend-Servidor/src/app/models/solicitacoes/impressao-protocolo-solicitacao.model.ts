export interface ImpressaoProtocoloSolicitacao{
  titulo: string;
  nomeSolicitante: string;
  numero: string;
  registro: number;
  dtEnvio: Date;
  tipo: string;
  termos?: any | any[];
}

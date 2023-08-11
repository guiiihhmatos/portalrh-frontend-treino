import { ActivatedRoute, Router } from '@angular/router';
import { ProtocoloRequisicaoDeclaracao } from './../../../../models/solicitacoes/requisicao-declaracao/protocolo-requisicao-declaracao.model';
import { Component } from '@angular/core';
import { ImpressaoProtocoloSolicitacao } from 'src/app/models/solicitacoes/impressao-protocolo-solicitacao.model';

@Component({
  selector: 'app-protocolo-requisicao-declaracao',
  templateUrl: './protocolo-requisicao-declaracao.component.html',
  styleUrls: ['./protocolo-requisicao-declaracao.component.scss']
})
export class ProtocoloRequisicaoDeclaracaoComponent {
  protocolo: ProtocoloRequisicaoDeclaracao;
  idProtocoloString: string;

  constructor(private rota: Router, private rotaAtual: ActivatedRoute) {
    this.protocolo = history.state.data;
    this.idProtocoloString = String(this.protocolo.id).padStart(4, '0');
  }

  redirectToPDF() {
    const dadosImpressao = {
      titulo: "Protocolo de solicitação de Requisição de Declaração",
      nomeSolicitante: this.protocolo.nome,
      numero: this.idProtocoloString,
      dtEnvio: this.protocolo.dtPedido,
      registro: this.protocolo.matricula,
      tipo: "requisicao_declaracao"
    } as ImpressaoProtocoloSolicitacao
    this.rota.navigate(
      [
        '/solicitacoes/imprimir-protocolo/',"requisicao-declaracao",
        this.idProtocoloString,
      ],
      { relativeTo: this.rotaAtual, state: { data: dadosImpressao } }
    );
  }
}

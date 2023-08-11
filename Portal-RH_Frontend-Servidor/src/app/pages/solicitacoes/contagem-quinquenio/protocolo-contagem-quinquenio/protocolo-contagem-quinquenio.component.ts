import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProtocoloContagemQuinquenio } from 'src/app/models/solicitacoes/contagem-quinquenio/protocolo-contagem-quinquenio.model';
import { ImpressaoProtocoloSolicitacao } from 'src/app/models/solicitacoes/impressao-protocolo-solicitacao.model';

@Component({
  selector: 'app-protocolo-contagem-quinquenio',
  templateUrl: './protocolo-contagem-quinquenio.component.html',
  styleUrls: ['./protocolo-contagem-quinquenio.component.scss'],
})
export class ProtocoloContagemQuinquenioComponent {
  protocolo: ProtocoloContagemQuinquenio;
  idProtocoloString: string;

  constructor(private rota: Router, private rotaAtual: ActivatedRoute) {
    this.protocolo = history.state.data;
    this.idProtocoloString = String(this.protocolo.id).padStart(4, '0');
  }

  redirectToPDF() {
    const dadosImpressao = {
      titulo: "Protocolo de solicitação de Contagem de Licença Prêmio",
      nomeSolicitante: this.protocolo.nome,
      numero: this.idProtocoloString,
      dtEnvio: this.protocolo.dtPedido,
      registro: this.protocolo.matricula,
      tipo: "licenca_premio"
    } as ImpressaoProtocoloSolicitacao
    this.rota.navigate(
      [
        '/solicitacoes/imprimir-protocolo/', "contagem-quinquenio",
        this.idProtocoloString,
      ],
      { relativeTo: this.rotaAtual, state: { data: dadosImpressao } }
    );
  }
}

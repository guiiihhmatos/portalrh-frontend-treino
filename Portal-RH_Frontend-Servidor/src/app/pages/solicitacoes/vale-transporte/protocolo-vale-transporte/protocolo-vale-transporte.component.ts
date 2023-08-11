import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImpressaoProtocoloSolicitacao } from 'src/app/models/solicitacoes/impressao-protocolo-solicitacao.model';
import { ProtocoloValeTransporte } from 'src/app/models/solicitacoes/vale-transporte/vale-transporte-protoco.model';

@Component({
  selector: 'app-protocolo-vale-transporte',
  templateUrl: './protocolo-vale-transporte.component.html',
  styleUrls: ['./protocolo-vale-transporte.component.scss']
})
export class ProtocoloValeTransporteComponent {
  protocolo: ProtocoloValeTransporte;
  idProtocoloString: string;

  constructor(private rota: Router, private rotaAtual: ActivatedRoute) {
    this.protocolo = history.state.data;
    this.idProtocoloString = String(this.protocolo.id).padStart(4, '0');
  }

  redirectToPDF() {
    const dadosImpressao = {
      titulo: "Protocolo de solicitação de Vale Transporte",
      nomeSolicitante: this.protocolo.nome,
      numero: this.idProtocoloString,
      dtEnvio: this.protocolo.dtPedido,
      registro: this.protocolo.matricula,
      tipo: "vale_transporte"
    } as ImpressaoProtocoloSolicitacao
    this.rota.navigate(
      [
        '/solicitacoes/imprimir-protocolo/',"vale-transporte",
        this.idProtocoloString,
      ],
      { relativeTo: this.rotaAtual, state: { data: dadosImpressao } }
    );
  }
}

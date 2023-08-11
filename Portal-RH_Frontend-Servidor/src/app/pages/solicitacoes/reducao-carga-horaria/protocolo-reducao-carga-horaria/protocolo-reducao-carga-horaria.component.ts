import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImpressaoProtocoloSolicitacao } from 'src/app/models/solicitacoes/impressao-protocolo-solicitacao.model';
import { ProtocoloReducaoCH } from 'src/app/models/solicitacoes/reducao-carga-horaria/protocolo-reducao-carga-horaria.models';

@Component({
  selector: 'app-protocolo-reducao-carga-horaria',
  templateUrl: './protocolo-reducao-carga-horaria.component.html',
  styleUrls: ['./protocolo-reducao-carga-horaria.component.scss']
})
export class ProtocoloReducaoCargaHorariaComponent {
  protocolo: ProtocoloReducaoCH;
  idProtocoloString: string;

  constructor(private rota: Router, private rotaAtual: ActivatedRoute) {
    this.protocolo = history.state.data;
    this.idProtocoloString = String(this.protocolo.id).padStart(4, '0');
  }

  redirectToPDF() {
    const dadosImpressao = {
      titulo: "Protocolo de solicitação de Redução de carga horária",
      nomeSolicitante: this.protocolo.nome,
      numero: this.idProtocoloString,
      dtEnvio: this.protocolo.dtPedido,
      registro: this.protocolo.matricula,
      tipo: "reducao_carga_horaria"
    } as ImpressaoProtocoloSolicitacao
    this.rota.navigate(
      [
        '/solicitacoes/imprimir-protocolo/',"reducao-carga-horaria",
        this.idProtocoloString,
      ],
      { relativeTo: this.rotaAtual, state: { data: dadosImpressao } }
    );
  }
}

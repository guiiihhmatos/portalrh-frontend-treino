import { ImpressaoProtocoloSolicitacao } from './../../../../models/solicitacoes/impressao-protocolo-solicitacao.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProtocoloAbonoNatal } from './../../../../models/solicitacoes/abono-natal/protocolo-abono-natal.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-protocolo-abono-natal',
  templateUrl: './protocolo-abono-natal.component.html',
  styleUrls: ['./protocolo-abono-natal.component.scss']
})
export class ProtocoloAbonoNatalComponent {

  protocolo: ProtocoloAbonoNatal
  idProtocoloString: string;
  constructor(private rota: Router, private rotaAtual: ActivatedRoute){
    this.protocolo = history.state.data;
    this.idProtocoloString = String(this.protocolo.id).padStart(4, '0');
  }

  redirectToPDF(){
    const dadosImpressao = {
      titulo: "Protocolo de solicitação de não recebimento de abono de natal",
      numero: this.idProtocoloString,
      nomeSolicitante: this.protocolo.nome,
      registro: this.protocolo.matricula,
      dtEnvio: this.protocolo.dtPedido,
      tipo: "nao_recebimento_abono"
    } as ImpressaoProtocoloSolicitacao
    this.rota.navigate(['/solicitacoes/imprimir-protocolo/', "abono-natal", this.idProtocoloString], {relativeTo: this.rotaAtual, state: {data: dadosImpressao}})
  }
}

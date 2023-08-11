import { MatSnackBar } from '@angular/material/snack-bar';
import { AbonoNatalService } from './../../../../services/solicitacoes/abono-natal/abono-natal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProtocoloAbonoNatal } from './../../../../models/solicitacoes/abono-natal/protocolo-abono-natal.model';

import { Component } from '@angular/core';
import { ImpressaoProtocoloSolicitacao } from 'src/app/models/solicitacoes/impressao-protocolo-solicitacao.model';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-solicitacao-abono-realizada',
  templateUrl: './solicitacao-abono-realizada.component.html',
  styleUrls: ['./solicitacao-abono-realizada.component.scss'],
})
export class SolicitacaoAbonoRealizadaComponent {
  protocolo: ProtocoloAbonoNatal;
  idProtocoloString: string;
  // lengthAndamento: number;

  constructor(
    private rota: Router,
    private rotaAtual: ActivatedRoute,
    private abonoService: AbonoNatalService,
    private _snackBar: MatSnackBar
  ) {
    this.protocolo = history.state.data;
    this.idProtocoloString = String(this.protocolo.id).padStart(4, '0');
    // this.lengthAndamento = Array(this.protocolo.andamento).length;
  }

  redirectToPDF() {
    const dadosImpressao = {
      titulo: "Protocolo de solicitação de não recebimento de abono de natal",
      numero: this.idProtocoloString,
      nomeSolicitante: this.protocolo.nome,
      registro: this.protocolo.matricula,
      dtEnvio: this.protocolo.dtPedido,
      tipo: "nao_recebimento_abono"
    } as ImpressaoProtocoloSolicitacao
    this.rota.navigate(
      [
        '/solicitacoes/imprimir-protocolo/', "abono-natal",
        this.idProtocoloString,
      ],
      { relativeTo: this.rotaAtual, state: { data: dadosImpressao } }
    );
  }

  cancelarSolicitacao() {
    const matricula = Number(this.protocolo.matricula);
    const cpf = this.protocolo.cpf;
    const exercicio = Number(this.protocolo.exercicio);
    this.abonoService.cancelarSolicitacao(matricula, cpf, exercicio).subscribe(
      (res) => {
        this.rota.navigate(['/solicitacoes'])
        this._snackBar.open("Solicitação cancelada com sucesso: Abono Natal", "OK", { duration: 5000 });
      },
      (error) => {
        AppComponent.openSwal({message:"Erro ao cancelar solicitação", text: error.error.message});
      }
    );
  }
}

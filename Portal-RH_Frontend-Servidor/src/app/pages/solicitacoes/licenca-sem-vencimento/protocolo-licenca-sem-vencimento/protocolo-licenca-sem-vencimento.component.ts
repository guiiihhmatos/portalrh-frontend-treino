import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servidor } from 'src/app/models/servidor/servidor.model';
import { ImpressaoProtocoloSolicitacao } from 'src/app/models/solicitacoes/impressao-protocolo-solicitacao.model';
import { ProtocoloLicencaSV } from 'src/app/models/solicitacoes/licenca-sem-vencimento/protocolo-licenca-vencimento.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LicencaSemVencimentoService } from 'src/app/services/solicitacoes/licenca-sem-vencimento/licenca-sem-vencimento.service';
import { TermsComponent } from '../dialogs/terms/terms.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-protocolo-licenca-sem-vencimento',
  templateUrl: './protocolo-licenca-sem-vencimento.component.html',
  styleUrls: ['./protocolo-licenca-sem-vencimento.component.scss'],
})
export class ProtocoloLicencaSemVencimentoComponent {
  protocolo: ProtocoloLicencaSV;
  tipoLSV: string;
  idProtocoloString: string;
  servidor: Servidor;
  terms: any[];

  constructor(
    private rota: Router,
    private rotaAtual: ActivatedRoute,
    private auth: AuthService,
    private LSVService: LicencaSemVencimentoService,
    public dialog: MatDialog
  ) {
    this.protocolo = history.state.data.solicitacao;
    this.tipoLSV = history.state.data.tipo;
    this.terms = history.state.data.termos;
    this.servidor = JSON.parse(auth.getServidor());
    this.idProtocoloString = String(this.protocolo.id).padStart(4, '0');
  }

  ngOnInit():void {
    this.getTerms();
  }

  redirectToPDF() {
    const dadosImpressao = {
      titulo: 'Protocolo de solicitação de Licença para tratar de interesses particulares (Licença sem vencimento)',
      nomeSolicitante: this.protocolo.nome,
      numero: this.idProtocoloString,
      dtEnvio: this.protocolo.dtPedido,
      registro: this.protocolo.matricula,
      tipo: 'licenca_sem_vencimento',
      termos: this.terms
    } as ImpressaoProtocoloSolicitacao;
    this.rota.navigate(
      [
        '/solicitacoes/imprimir-protocolo/',
        'licenca-sem-vencimento',
        this.idProtocoloString,
      ],
      { relativeTo: this.rotaAtual, state: { data: dadosImpressao } }
    );
  }

  getTerms() {;
    const dtAdmissao = new Date(this.servidor.dtAdmissao);
    const dtLim = new Date('2010-11-05');
    const massa = dtAdmissao <= dtLim ? '1' : '2';

    this.LSVService.getTerms().subscribe((res) => {
      res.forEach((terms) => {
        if (terms.tipo == this.tipoLSV && terms.massa == massa) {
          this.terms = terms;
        }
      });
    });
  }

  openTerms() {
    this.openDialog(this.terms);
  }

  openDialog(terms: any) {
    const dialogRef = this.dialog.open(TermsComponent, {
      data: { terms, accept: false },
    });
  }
}

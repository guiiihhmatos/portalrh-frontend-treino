import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servidor } from 'src/app/models/servidor/servidor.model';
import { ImpressaoProtocoloSolicitacao } from 'src/app/models/solicitacoes/impressao-protocolo-solicitacao.model';
import { AndamentoLSV, ProtocoloLicencaSV } from 'src/app/models/solicitacoes/licenca-sem-vencimento/protocolo-licenca-vencimento.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LicencaSemVencimentoService } from 'src/app/services/solicitacoes/licenca-sem-vencimento/licenca-sem-vencimento.service';
import { TermsComponent } from '../dialogs/terms/terms.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AndamentoLicencaSemVencimentoComponent } from '../dialogs/andamento-licenca-sem-vencimento/andamento-licenca-sem-vencimento.component';

@Component({
  selector: 'app-licenca-sem-vencimento-solicitada',
  templateUrl: './licenca-sem-vencimento-solicitada.component.html',
  styleUrls: ['./licenca-sem-vencimento-solicitada.component.scss']
})
export class LicencaSemVencimentoSolicitadaComponent {
  solicitacoes = new MatTableDataSource<ProtocoloLicencaSV>();
  displayedColumns = ['protocolo', 'data', 'tipo', 'imprimir']
  servidor: Servidor;
  terms: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private auth: AuthService,
    private rota: Router,
    private rotaAtual: ActivatedRoute,
    private LSVService: LicencaSemVencimentoService,
    private dialog: MatDialog
  ) {
    this.servidor = JSON.parse(auth.getServidor());

  }

  ngOnInit(): void{
    this.getSolicitacoesLSV(this.servidor.matricula, this.servidor.cpf);
    this.getTerms();
  }

  ngAfterViewInit(): void{
    this.solicitacoes.paginator = this.paginator;
  }

  getSolicitacoesLSV(matricula: number, cpf: string) {
    this.LSVService.getSolicitacoesLSV(matricula, cpf).subscribe({
      next: (solicitacoes) => {
        this.solicitacoes.data = solicitacoes;
      }
  });
  }

  redirectToPDF(solicitacao: ProtocoloLicencaSV) {
    const dtAdmissao = new Date(this.servidor.dtAdmissao);
    const dtLim = new Date('2010-11-05');
    const massa = dtAdmissao <= dtLim ? '1' : '2';
    const tipoLSV = solicitacao.contribuicao? 'com contribuição': 'sem contribuição';
    let termos;
    this.terms.forEach((terms) => {
      if (terms.tipo == tipoLSV && terms.massa == massa) {
        termos = terms;
      }
    });


    const dadosImpressao = {
      titulo: 'Protocolo de solicitação de Licença para tratar de interesses particulares (Licença sem vencimento)',
      numero: String(solicitacao.id).padStart(4,"0"),
      nomeSolicitante: solicitacao.nome,
      registro: solicitacao.matricula,
      dtEnvio: solicitacao.dtPedido,
      tipo: 'licenca_sem_vencimento',
      termos: termos,
    } as ImpressaoProtocoloSolicitacao;
    this.rota.navigate(
      [
        '/solicitacoes/imprimir-protocolo/',
        'licenca-sem-vencimento',
        String(solicitacao.id).padStart(4,"0"),
      ],
      { relativeTo: this.rotaAtual, state: { data: dadosImpressao } }
    );
  }


  showAndamento(solicitacao: ProtocoloLicencaSV) {
    const dialogRef = this.dialog.open(AndamentoLicencaSemVencimentoComponent, {
      data:  solicitacao ,
    });
  }

  getTerms(){
    this.LSVService.getTerms().subscribe((res) => {
      this.terms = res;
    });
  }

  redirectToForm(){
    this.rota.navigate(
      ['/solicitacoes/licenca-sem-vencimento/formulario'],
      { relativeTo: this.rotaAtual, state: { outraSolicitacao: true } }
    );
  }
}

import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Servidor } from 'src/app/models/servidor/servidor.model';
import { ImpressaoProtocoloSolicitacao } from 'src/app/models/solicitacoes/impressao-protocolo-solicitacao.model';
import { ProtocoloRequisicaoDeclaracao } from 'src/app/models/solicitacoes/requisicao-declaracao/protocolo-requisicao-declaracao.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RequisicaoDeclaracaoService } from 'src/app/services/solicitacoes/requisicao-declaracao/requisicao-declaracao.service';
import { AndamentoRequisicaoDeclaracaoComponent } from '../dialogs/andamento-requisicao-declaracao/andamento-requisicao-declaracao.component';

@Component({
  selector: 'app-requisicao-declaracao-realizada',
  templateUrl: './requisicao-declaracao-realizada.component.html',
  styleUrls: ['./requisicao-declaracao-realizada.component.scss'],
})
export class RequisicaoDeclaracaoRealizadaComponent {
  servidor: Servidor;
  dataRD = new MatTableDataSource<ProtocoloRequisicaoDeclaracao>();
  displayedColumns = ['protocolo', 'data', 'tipo', 'imprimir'];
  solicitacaoSelec: ProtocoloRequisicaoDeclaracao | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private auth: AuthService,
    private RDService: RequisicaoDeclaracaoService,
    private rota: Router,
    private rotaAtual: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.servidor = JSON.parse(auth.getServidor());
  }

  ngOnInit(): void {
    this.getSolicitacoesRD(this.servidor.matricula, this.servidor.cpf);
  }
  ngAfterViewInit(): void {
    this.dataRD.paginator = this.paginator;
  }

  getSolicitacoesRD(matricula: number, cpf: string) {
    this.RDService.listarRequisicoesDeclaracao(matricula, cpf).subscribe(
      (requisicoes) => {
        this.dataRD.data = requisicoes;
      }
    );
  }

  redirectToForm() {
    this.rota.navigate(
      ['/solicitacoes/requisicao-declaracao/formulario'],
      { relativeTo: this.rotaAtual, state: { outraSolicitacao: true } }
    );
  }

  redirectToPDF(solicitacao: ProtocoloRequisicaoDeclaracao) {
    const dadosImpressao = {
      titulo: 'Protocolo de solicitação de Requisição de Declaração',
      nomeSolicitante: solicitacao.nome,
      numero: solicitacao.id.toString().padStart(4, '0'),
      dtEnvio: solicitacao.dtPedido,
      registro: solicitacao.matricula,
      tipo: 'requisicao_declaracao',
    } as ImpressaoProtocoloSolicitacao;
    this.rota.navigate(
      [
        '/solicitacoes/imprimir-protocolo/',
        'requisicao-declaracao',
        solicitacao.id.toString().padStart(4, '0'),
      ],
      { relativeTo: this.rotaAtual, state: { data: dadosImpressao } }
    );
  }

  openDialog(protocolo: ProtocoloRequisicaoDeclaracao) {
    const container = document.getElementsByTagName(
      'body'
    )[0] as HTMLBodyElement;
    if (container.clientWidth > 1400) {
      this.dialog.open(AndamentoRequisicaoDeclaracaoComponent, {
        position: { top: '30vh', left: '45vw' },
        data: protocolo,
      });
    } else {
      this.dialog.open(AndamentoRequisicaoDeclaracaoComponent, {
        position: { top: '30vh' },
        data: protocolo,
      });
    }
  }
}

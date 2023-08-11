import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Servidor } from 'src/app/models/servidor/servidor.model';
import { ImpressaoProtocoloSolicitacao } from 'src/app/models/solicitacoes/impressao-protocolo-solicitacao.model';
import { AndamentoReducaoCH, ProtocoloReducaoCH } from 'src/app/models/solicitacoes/reducao-carga-horaria/protocolo-reducao-carga-horaria.models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReducaoCargaHorariaService } from 'src/app/services/solicitacoes/reducao-carga-horaria/reducao-carga-horaria.service';
import { AndamentoReducaoCargaHorariaComponent } from '../dialogs/andamento-reducao-carga-horaria/andamento-reducao-carga-horaria.component';

@Component({
  selector: 'app-reducao-carga-horaria-realizada',
  templateUrl: './reducao-carga-horaria-realizada.component.html',
  styleUrls: ['./reducao-carga-horaria-realizada.component.scss'],
})
export class ReducaoCargaHorariaRealizadaComponent {
  solicitacoes = new MatTableDataSource<ProtocoloReducaoCH>();
  displayedColumns = ['protocolo', 'data', 'tipo', 'imprimir']
  servidor: Servidor;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private auth: AuthService,
    private rchService: ReducaoCargaHorariaService,
    private rota: Router,
    private rotaAtual: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.servidor = JSON.parse(auth.getServidor());
  }

  ngOnInit(): void {
    this.getSolicitacoes(this.servidor.matricula, this.servidor.cpf);
  }

  ngAfterViewInit(): void{
    this.solicitacoes.paginator = this.paginator;
  }

  getSolicitacoes(matriula: number, cpf: string | number) {
    this.rchService.getSolicitacoes(matriula, cpf).subscribe({
      next: (solicitacoes) => {
        this.solicitacoes.data = solicitacoes;
      },
    });
  }

  redirectToPDF(solicitacao: ProtocoloReducaoCH){
    const dadosImpressao = {
      titulo: 'Protocolo de solicitação de Redução de Carga Horária',
      nomeSolicitante: solicitacao.nome,
      numero: solicitacao.id.toString().padStart(4, '0'),
      dtEnvio: solicitacao.dtPedido,
      registro: solicitacao.matricula,
      tipo: 'reducao_carga_horaria',
    } as ImpressaoProtocoloSolicitacao;
    this.rota.navigate(
      [
        '/solicitacoes/imprimir-protocolo/',
        'reducao-carga-horaria',
        solicitacao.id.toString().padStart(4, '0'),
      ],
      { relativeTo: this.rotaAtual, state: { data: dadosImpressao } }
    );
  }

  openDialog(protocolo: ProtocoloReducaoCH){
    const container = document.getElementsByTagName('body')[0] as HTMLBodyElement;
    if (container.clientWidth > 1400) {
      this.dialog.open(AndamentoReducaoCargaHorariaComponent, {
        position: { top: '30vh', left: '45vw' },
        data: protocolo,
      });
    } else {
      this.dialog.open(AndamentoReducaoCargaHorariaComponent, {
        position: { top: '30vh' },
        data: protocolo,
      });
    }
  }

  redirectToForm() {
    this.rota.navigate(
      ['/solicitacoes/reducao-carga-horaria/formulario'],
      { relativeTo: this.rotaAtual, state: { outraSolicitacao: true } }
    );
  }
}

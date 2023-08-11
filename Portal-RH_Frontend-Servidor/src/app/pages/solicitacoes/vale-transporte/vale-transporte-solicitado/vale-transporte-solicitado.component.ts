import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servidor } from 'src/app/models/servidor/servidor.model';
import { ImpressaoProtocoloSolicitacao } from 'src/app/models/solicitacoes/impressao-protocolo-solicitacao.model';
import {
  AndamentoVT,
  ProtocoloValeTransporte,
} from 'src/app/models/solicitacoes/vale-transporte/vale-transporte-protoco.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ValeTransporteService } from 'src/app/services/solicitacoes/vale-transporte/vale-transporte.service';

@Component({
  selector: 'app-vale-transporte-solicitado',
  templateUrl: './vale-transporte-solicitado.component.html',
  styleUrls: ['./vale-transporte-solicitado.component.scss'],
})
export class ValeTransporteSolicitadoComponent {
  protocolo: ProtocoloValeTransporte;
  servidor: Servidor;
  andamento: AndamentoVT | null;

  constructor(
    private auth: AuthService,
    private rota: Router,
    private rotaAtual: ActivatedRoute,
    private VTService: ValeTransporteService
  ) {
    this.servidor = JSON.parse(auth.getServidor());

    //inciializa as variaveis com o valor de redirecionamento
    this.protocolo = history.state.data;
    this.andamento =
      this.protocolo.andamento[this.protocolo.andamento.length - 1];
  }

  ngOnInit(): void {
    this.getSolicitacoes(this.servidor.matricula, this.servidor.cpf);
  }

  redirectToPDF() {
    const dadosImpressao = {
      titulo: 'Protocolo de solicitação de Vale Transporte',
      numero: String(this.protocolo.id).padStart(4, '0'),
      nomeSolicitante: this.protocolo.nome,
      registro: this.protocolo.matricula,
      dtEnvio: this.protocolo.dtPedido,
      tipo: 'vale_transporte',
    } as ImpressaoProtocoloSolicitacao;
    this.rota.navigate(
      [
        '/solicitacoes/imprimir-protocolo/',
        'vale-transporte',
        String(this.protocolo.id).padStart(4, '0'),
      ],
      { relativeTo: this.rotaAtual, state: { data: dadosImpressao } }
    );
  }

  //atualiza os valores com o andamento
  getSolicitacoes(matricula: number, cpf: string) {
    this.VTService.getSolicitacoesVT(matricula, cpf).subscribe((res) => {
      res.forEach((solicitacao) => {
        if (solicitacao.id === this.protocolo.id) {
          this.protocolo = solicitacao;

          this.andamento = this.getLastAndamento(this.protocolo.andamento);
        }
      });
    });
  }

  getLastAndamento(andamentos: AndamentoVT[]): AndamentoVT | null{

    if(andamentos.length < 1 || andamentos == null){
      return null;
    }
    //aplica os ids de andamento em um array
    let idsAndamento: number[] = [];
    andamentos.forEach(andamento =>{
      idsAndamento.push(andamento.id);
    })

    //function que verifica qual o maior id do array e armazena em uma variavel
    // if(idsAndamento)
    let lastAndamento:any = idsAndamento.reduce(function(a:number,b:number){
      return Math.max(a,b);
    });

    //aplica na variavel o objeto do andamento
    andamentos.forEach(andamento => {
      if(andamento.id === lastAndamento){
        lastAndamento = andamento as AndamentoVT;
      }
    })
    return lastAndamento;
  }

}

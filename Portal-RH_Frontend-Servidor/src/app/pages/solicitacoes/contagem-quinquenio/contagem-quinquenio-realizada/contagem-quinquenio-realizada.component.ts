import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servidor } from 'src/app/models/servidor/servidor.model';
import { AndamentoCQ, ProtocoloContagemQuinquenio } from 'src/app/models/solicitacoes/contagem-quinquenio/protocolo-contagem-quinquenio.model';
import { ImpressaoProtocoloSolicitacao } from 'src/app/models/solicitacoes/impressao-protocolo-solicitacao.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ContagemQuinquenioService } from 'src/app/services/solicitacoes/contagem-quinquenio/contagem-quinquenio.service';

@Component({
  selector: 'app-contagem-quinquenio-realizada',
  templateUrl: './contagem-quinquenio-realizada.component.html',
  styleUrls: ['./contagem-quinquenio-realizada.component.scss'],
})
export class ContagemQuinquenioRealizadaComponent {
  protocolo: ProtocoloContagemQuinquenio;
  servidor: Servidor;
  andamento: AndamentoCQ | null;

  constructor(
    private auth: AuthService,
    private rota: Router,
    private rotaAtual: ActivatedRoute,
    private CQService: ContagemQuinquenioService,
  ) {
    this.servidor = JSON.parse(auth.getServidor());

    //inciializa as variaveis com o valor de redirecionamento
    this.protocolo = history.state.data;
    this.andamento = null;
  }

  ngOnInit(): void{
    let idProtocolo = history.state.data.id;
    let cpf = history.state.data.cpf;
    this.getAndamento(idProtocolo, cpf);
  }

  redirectToPDF() {
    const dadosImpressao = {
      titulo: 'Protocolo de solicitação de Contagem de Licença Prêmio',
      numero: String(this.protocolo.id).padStart(4,"0"),
      nomeSolicitante: this.protocolo.nome,
      registro: this.protocolo.matricula,
      dtEnvio: this.protocolo.dtPedido,
      tipo: 'licenca_premio',
    } as ImpressaoProtocoloSolicitacao;
    this.rota.navigate(
      [
        '/solicitacoes/imprimir-protocolo/',
        'contagem-quinquenio',
        String(this.protocolo.id).padStart(4,"0"),
      ],
      { relativeTo: this.rotaAtual, state: { data: dadosImpressao } }
    );
  }

  //atualiza os valores com o andamento
  getAndamento(id: number, cpf: string){
    this.CQService.getSolicitacaoCQ(id, cpf).subscribe(
      (res)=>{
        this.protocolo = res;
        this.andamento = this.getLastAndamento(this.protocolo.andamento);
      }
    )
  }

  getLastAndamento(andamentos: AndamentoCQ[]): AndamentoCQ | null{

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
        lastAndamento = andamento as AndamentoCQ;
      }
    })
    return lastAndamento;
  }


}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AndamentoReducaoCH, ProtocoloReducaoCH } from 'src/app/models/solicitacoes/reducao-carga-horaria/protocolo-reducao-carga-horaria.models';

@Component({
  selector: 'app-andamento-reducao-carga-horaria',
  templateUrl: './andamento-reducao-carga-horaria.component.html',
  styleUrls: ['./andamento-reducao-carga-horaria.component.scss']
})
export class AndamentoReducaoCargaHorariaComponent {

  andamento: AndamentoReducaoCH | null;
  constructor(
    dialogRef: MatDialogRef<AndamentoReducaoCargaHorariaComponent>,
    @Inject(MAT_DIALOG_DATA) public solicitacao: ProtocoloReducaoCH
  ) {
    this.andamento = this.getLastAndamento(solicitacao.andamento);

  }

  getLastAndamento(andamentos: AndamentoReducaoCH[]): AndamentoReducaoCH | null{

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
        lastAndamento = andamento as AndamentoReducaoCH;
      }
    })
    return lastAndamento;
  }
}

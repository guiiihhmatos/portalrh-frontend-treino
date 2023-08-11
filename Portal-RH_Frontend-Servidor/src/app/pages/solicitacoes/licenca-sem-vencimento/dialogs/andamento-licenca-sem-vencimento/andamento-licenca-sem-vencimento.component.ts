import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Servidor } from 'src/app/models/servidor/servidor.model';
import {
  AndamentoLSV,
  ProtocoloLicencaSV,
} from 'src/app/models/solicitacoes/licenca-sem-vencimento/protocolo-licenca-vencimento.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LicencaSemVencimentoService } from 'src/app/services/solicitacoes/licenca-sem-vencimento/licenca-sem-vencimento.service';

@Component({
  selector: 'app-andamento-licenca-sem-vencimento',
  templateUrl: './andamento-licenca-sem-vencimento.component.html',
  styleUrls: ['./andamento-licenca-sem-vencimento.component.scss'],
})
export class AndamentoLicencaSemVencimentoComponent {
  andamento: AndamentoLSV | null;
  servidor: Servidor;
  constructor(
    dialogRef: MatDialogRef<AndamentoLicencaSemVencimentoComponent>,
    @Inject(MAT_DIALOG_DATA) public solicitacao: ProtocoloLicencaSV,
    private auth: AuthService,
    private LSVService: LicencaSemVencimentoService,
  ) {
    this.andamento = this.getLastAndamento(solicitacao.andamento);
    this.servidor = JSON.parse(auth.getServidor());
  }

  getLastAndamento(andamentos: AndamentoLSV[]): AndamentoLSV | null{

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
        lastAndamento = andamento as AndamentoLSV;
      }
    })
    return lastAndamento;
  }
}

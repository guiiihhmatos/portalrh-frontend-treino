import { ProtocoloDeclaracaoBens } from '../../../models/declaracao-bens/protocolo-declaracao-bens.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-protocolo-declaracao',
  templateUrl: './protocolo-declaracao.component.html',
  styleUrls: ['./protocolo-declaracao.component.scss']
})
export class ProtocoloDeclaracaoComponent {
  protocoloDeclaracao: ProtocoloDeclaracaoBens


  constructor(
    private rota: Router,
    private rotaAtual: ActivatedRoute
    ){
    this.protocoloDeclaracao = history.state.data;
  }


  ngOnInit(): void {
  }

  redirectToPDF(){
    this.rota.navigate(['/declaracao-bens/imprimir-protocolo/', this.protocoloDeclaracao.id ], {relativeTo: this.rotaAtual, state:{data: this.protocoloDeclaracao}})
  }
}

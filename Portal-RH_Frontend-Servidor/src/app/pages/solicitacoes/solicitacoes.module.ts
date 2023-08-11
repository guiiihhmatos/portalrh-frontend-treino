import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitacoesRoutingModule } from './solicitacoes-routing.module';
import { PaginaInicialSolicitacoesComponent } from './pages-solicitacoes/pagina-inicial-solicitacoes/pagina-inicial-solicitacoes.component';
import { ImprirmirProtocoloSolicitacaoComponent } from './pages-solicitacoes/imprirmir-protocolo-solicitacao/imprirmir-protocolo-solicitacao.component';


@NgModule({
  declarations: [
    PaginaInicialSolicitacoesComponent,
    ImprirmirProtocoloSolicitacaoComponent,
  ],
  imports: [
    CommonModule,
    SolicitacoesRoutingModule
  ]
})
export class SolicitacoesModule { }

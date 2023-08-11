import { FormularioRequisicaoDeclaracaoComponent } from './formulario-requisicao-declaracao/formulario-requisicao-declaracao.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtocoloRequisicaoDeclaracaoComponent } from './protocolo-requisicao-declaracao/protocolo-requisicao-declaracao.component';
import { RequisicaoDeclaracaoRealizadaComponent } from './requisicao-declaracao-realizada/requisicao-declaracao-realizada.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'formulario'
  },
  {
    path: 'formulario', pathMatch: 'full', component: FormularioRequisicaoDeclaracaoComponent
  },
  {
    path: 'protocolo/:id_protocolo', pathMatch: 'full', component: ProtocoloRequisicaoDeclaracaoComponent
  },
  {
    path: 'realizada', pathMatch: 'full', component: RequisicaoDeclaracaoRealizadaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequisicaoDeclaracaoRoutingModule { }

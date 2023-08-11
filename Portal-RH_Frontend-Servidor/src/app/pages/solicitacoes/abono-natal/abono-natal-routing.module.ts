import { SolicitacaoAbonoRealizadaComponent } from './solicitacao-abono-realizada/solicitacao-abono-realizada.component';
import { ProtocoloAbonoNatalComponent } from './protocolo-abono-natal/protocolo-abono-natal.component';
import { FormularioAbonoNatalComponent } from './formulario-abono-natal/formulario-abono-natal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'formulario'
  },
  {
    path: 'formulario', pathMatch: 'full', component: FormularioAbonoNatalComponent
  },
  {
    path: 'protocolo/:id_protocolo', pathMatch: 'full', component: ProtocoloAbonoNatalComponent
  },
  {
    path: 'solicitacao-realizada/:id_protocolo', pathMatch: 'full', component: SolicitacaoAbonoRealizadaComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbonoNatalRoutingModule { }

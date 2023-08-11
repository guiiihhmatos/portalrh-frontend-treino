import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioLicencaSemVencimentoComponent } from './formulario-licenca-sem-vencimento/formulario-licenca-sem-vencimento.component';
import { ProtocoloLicencaSemVencimentoComponent } from './protocolo-licenca-sem-vencimento/protocolo-licenca-sem-vencimento.component';
import { LicencaSemVencimentoSolicitadaComponent } from './licenca-sem-vencimento-solicitada/licenca-sem-vencimento-solicitada.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full',  redirectTo: 'formulario'
  },
  {
    path: 'formulario', pathMatch: 'full', component: FormularioLicencaSemVencimentoComponent
  },
  {
    path: 'protocolo/:id_protocolo', pathMatch: 'full', component: ProtocoloLicencaSemVencimentoComponent
  },
  {
    path: 'realizada', pathMatch: 'full', component: LicencaSemVencimentoSolicitadaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicencaSemVencimentoRoutingModule { }

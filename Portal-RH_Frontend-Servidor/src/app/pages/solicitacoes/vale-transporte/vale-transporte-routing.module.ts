import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioValeTransporteComponent } from './formulario-vale-transporte/formulario-vale-transporte.component';
import { ProtocoloValeTransporteComponent } from './protocolo-vale-transporte/protocolo-vale-transporte.component';
import { ValeTransporteSolicitadoComponent } from './vale-transporte-solicitado/vale-transporte-solicitado.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'formulario'
  },
  {
    path: 'formulario', pathMatch: 'full', component: FormularioValeTransporteComponent
  },
  {
    path: 'protocolo/:id_protocolo', pathMatch: 'full', component: ProtocoloValeTransporteComponent
  },
  {
    path: 'solicitado', pathMatch: 'full', component: ValeTransporteSolicitadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValeTransporteRoutingModule { }

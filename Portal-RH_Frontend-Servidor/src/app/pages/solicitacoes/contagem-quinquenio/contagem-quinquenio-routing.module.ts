import { FormularioContagemQuinquenioComponent } from './formulario-contagem-quinquenio/formulario-contagem-quinquenio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtocoloContagemQuinquenioComponent } from './protocolo-contagem-quinquenio/protocolo-contagem-quinquenio.component';
import { ContagemQuinquenioRealizadaComponent } from './contagem-quinquenio-realizada/contagem-quinquenio-realizada.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'formulario'
  },
  {
    path: 'formulario', pathMatch: 'full', component: FormularioContagemQuinquenioComponent
  },
  {
    path: 'protocolo/:id', pathMatch: 'full', component: ProtocoloContagemQuinquenioComponent
  },
  {
    path: 'realizada', pathMatch: 'full', component: ContagemQuinquenioRealizadaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContagemQuinquenioRoutingModule { }

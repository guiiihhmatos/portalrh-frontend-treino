import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioReducaoCargaHorariaComponent } from './formulario-reducao-carga-horaria/formulario-reducao-carga-horaria.component';
import { ProtocoloReducaoCargaHorariaComponent } from './protocolo-reducao-carga-horaria/protocolo-reducao-carga-horaria.component';
import { ReducaoCargaHorariaRealizadaComponent } from './reducao-carga-horaria-realizada/reducao-carga-horaria-realizada.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'formulario'
  },
  {
    path: 'formulario', pathMatch: 'full', component: FormularioReducaoCargaHorariaComponent
  },
  {
    path: 'protocolo/:id_protocolo', pathMatch: 'full', component: ProtocoloReducaoCargaHorariaComponent
  },
  {
    path: 'realizada', pathMatch: 'full', component: ReducaoCargaHorariaRealizadaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReducaoCargaHorariaRoutingModule { }

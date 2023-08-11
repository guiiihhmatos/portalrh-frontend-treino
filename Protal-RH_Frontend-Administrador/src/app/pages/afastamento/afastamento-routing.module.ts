import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfastamentoComponent } from './afastamento/afastamento.component';

const routes: Routes = [
  {
    path: 'relatorio', component: AfastamentoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfastamentoRoutingModule { }

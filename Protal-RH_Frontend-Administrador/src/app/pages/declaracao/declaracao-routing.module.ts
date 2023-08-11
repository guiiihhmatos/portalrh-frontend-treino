import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { RelatorioComponent } from './relatorio/relatorio.component';

const routes: Routes = [
  {
    path: 'relatorio', component: RelatorioComponent
  },
  {
    path: 'relatorio/detalhes', component: DetalhesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeclaracaoRoutingModule { }

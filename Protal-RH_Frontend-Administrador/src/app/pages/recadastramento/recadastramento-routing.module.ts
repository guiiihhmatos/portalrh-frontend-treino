import { RelatoriosComponent } from './relatorios/relatorios.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhesRecadastroComponent } from './detalhes-recadastro/detalhes-recadastro.component';
import { RecadastroPendenteComponent } from './recadastro-pendente/recadastro-pendente.component';

const routes: Routes = [

  {
    path: 'relatorio', component: RelatoriosComponent
  },
  {
    path: 'relatorio/detalhes', component: DetalhesRecadastroComponent
  },
  {
    path: 'pendentes', component : RecadastroPendenteComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecadastramentoRoutingModule { }

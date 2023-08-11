import { PossuiCadastroComponent } from './possui-cadastro/possui-cadastro.component';
import { ImprimirProtocoloComponent } from './imprimir-protocolo/imprimir-protocolo.component';
import { ProtocoloComponent } from './protocolo/protocolo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioRecadastramentoComponent } from './formulario-recadastramento/formulario-recadastramento.component';
import { FormTesteComponent } from './form-teste/form-teste.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'formulario'
  },
  {
    path: 'formulario', pathMatch: 'full', component: FormularioRecadastramentoComponent
  },
  {
    path: 'protocolo/:numero_protocolo', pathMatch: 'full', component:ProtocoloComponent
  },
  {
    path: 'imprimir-protocolo/:numero_protocolo', pathMatch: 'full', component: ImprimirProtocoloComponent
  },
  {
    path: 'possui-cadastro', pathMatch: 'full', component : PossuiCadastroComponent
  },
  {
    path: 'form-test', pathMatch: 'full', component: FormTesteComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecadastramentoRoutingModule { }

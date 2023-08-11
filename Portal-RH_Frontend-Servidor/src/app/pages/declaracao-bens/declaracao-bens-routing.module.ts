import { ConsultarProtocoloComponent } from './consultar-protocolo/consultar-protocolo.component';
import { ExoneracaoComponent } from './exoneracao/exoneracao.component';
import { RetificarDeclaracaoComponent } from './retificar-declaracao/retificar-declaracao.component';
import { DeclaradaComponent } from './declarada/declarada.component';
import { ImprimirProtocoloDeclaracaoComponent } from './imprimir-protocolo-declaracao/imprimir-protocolo-declaracao.component';
import { ProtocoloDeclaracaoComponent } from './protocolo-declaracao/protocolo-declaracao.component';
import { FormularioComponent } from './formulario/formulario.component';
import { EscolhaComponent } from './escolha/escolha.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'declaracoes'
  },
  {
    path: 'declaracoes', pathMatch: 'full', component: EscolhaComponent
  },
  {
    path: 'formulario/:exercicio',  pathMatch: 'full', component: FormularioComponent
  },
  {
    path: 'protocolo/:exercicio', pathMatch: 'full', component: ProtocoloDeclaracaoComponent
  },
  {
    path: 'imprimir-protocolo/:protocolo', pathMatch: 'full', component: ImprimirProtocoloDeclaracaoComponent
  },
  {
    path: ':exercicio/declarada', pathMatch: 'full', component: DeclaradaComponent
  },
  {
    path: 'retificacao/:exercicio', pathMatch: 'full', component: RetificarDeclaracaoComponent
  },
  {
    path: 'retificacao/exoneracao', pathMatch: 'full', component: RetificarDeclaracaoComponent
  },
  {
    path:'exoneracao', pathMatch:'full', component: ExoneracaoComponent
  },
  {
    path: 'consultar-protocolo', pathMatch: 'full', component: ConsultarProtocoloComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeclaracaoBensRoutingModule { }

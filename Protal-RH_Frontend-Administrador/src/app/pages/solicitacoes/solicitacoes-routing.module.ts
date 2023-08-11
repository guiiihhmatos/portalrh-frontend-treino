import { AbonoNatalComponent } from './dirh/abono-natal/abono-natal.component';
import { DigpComponent } from './digp/digp/digp.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirhComponent } from './dirh/dirh/dirh.component';
import { ContagemQuinquenioComponent } from './dirh/contagem-quinquenio/contagem-quinquenio.component';
import { ValeTransporteComponent } from './dirh/vale-transporte/vale-transporte.component';
import { DetalhesQuinquenioComponent } from './dirh/contagem-quinquenio/detalhes-quinquenio/detalhes-quinquenio.component';
import { DetalhesTransporteComponent } from './dirh/vale-transporte/detalhes-transporte/detalhes-transporte.component';
import { DeclaracoesComponent } from './digp/declaracoes/declaracoes.component';
import { ReducaoCargaHorariaComponent } from './digp/reducao-carga-horaria/reducao-carga-horaria.component';
import { LicencaSemVencimentoComponent } from './digp/licenca-sem-vencimento/licenca-sem-vencimento.component';
import { DetalhesDeclaracoesComponent } from './digp/declaracoes/detalhes-declaracoes/detalhes-declaracoes.component';
import { DetalhesLicencaSemVencimentoComponent } from './digp/licenca-sem-vencimento/detalhes-licenca-sem-vencimento/detalhes-licenca-sem-vencimento.component';
import { DetalhesCargaHorariaComponent } from './digp/reducao-carga-horaria/detalhes-carga-horaria/detalhes-carga-horaria.component';
import { PdfLicencaSemVencimentoComponent } from './digp/licenca-sem-vencimento/pdf-licenca-sem-vencimento/pdf-licenca-sem-vencimento.component';
import { PdfReducaoCargaHorariaComponent } from './digp/reducao-carga-horaria/pdf-reducao-carga-horaria/pdf-reducao-carga-horaria.component';

const routes: Routes = [

  {
    path: 'dirh', component: DirhComponent,
  },
  {
    path: 'dirh', children: [
      {
        path: 'abono-natal', component: AbonoNatalComponent
      },
      {
        path: 'licenca-premio', component: ContagemQuinquenioComponent
      },
      {
        path: 'licenca-premio/detalhes', component: DetalhesQuinquenioComponent
      },
      {
        path: 'vale-transporte', component: ValeTransporteComponent
      },
      {
        path: 'vale-transporte/detalhes', component: DetalhesTransporteComponent
      }
    ]
  },
  {
    path: 'digp', component: DigpComponent
  },
  {
    path: 'digp', children: [
      {
        path: 'declaracoes', component: DeclaracoesComponent
      },
      {
        path: 'declaracoes/detalhes', component: DetalhesDeclaracoesComponent
      },
      {
        path: 'reducao-carga-horaria', component: ReducaoCargaHorariaComponent
      },
      {
        path: 'reducao-carga-horaria/detalhes', component: DetalhesCargaHorariaComponent
      },
      {
        path: 'reducao-carga-horaria/pdf', component: PdfReducaoCargaHorariaComponent
      },
      {
        path: 'licenca-sem-vencimento', component: LicencaSemVencimentoComponent
      },
      {
        path: 'licenca-sem-vencimento/detalhes', component: DetalhesLicencaSemVencimentoComponent
      },
      {
        path: 'licenca-sem-vencimento/pdf', component: PdfLicencaSemVencimentoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitacoesRoutingModule { }

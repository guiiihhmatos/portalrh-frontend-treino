import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitacoesRoutingModule } from './solicitacoes-routing.module';
import { AbonoNatalComponent } from './dirh/abono-natal/abono-natal.component';
import { ContagemQuinquenioComponent } from './dirh/contagem-quinquenio/contagem-quinquenio.component';
import { ValeTransporteComponent } from './dirh/vale-transporte/vale-transporte.component';
import { DeclaracoesComponent } from './digp/declaracoes/declaracoes.component';
import { ReducaoCargaHorariaComponent } from './digp/reducao-carga-horaria/reducao-carga-horaria.component';
import { LicencaSemVencimentoComponent } from './digp/licenca-sem-vencimento/licenca-sem-vencimento.component';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { DetalhesQuinquenioComponent } from './dirh/contagem-quinquenio/detalhes-quinquenio/detalhes-quinquenio.component';
import { DetalhesTransporteComponent } from './dirh/vale-transporte/detalhes-transporte/detalhes-transporte.component';
import { DetalhesDeclaracoesComponent } from './digp/declaracoes/detalhes-declaracoes/detalhes-declaracoes.component';
import { DetalhesLicencaSemVencimentoComponent } from './digp/licenca-sem-vencimento/detalhes-licenca-sem-vencimento/detalhes-licenca-sem-vencimento.component';
import { DetalhesCargaHorariaComponent } from './digp/reducao-carga-horaria/detalhes-carga-horaria/detalhes-carga-horaria.component';
import { PdfLicencaSemVencimentoComponent } from './digp/licenca-sem-vencimento/pdf-licenca-sem-vencimento/pdf-licenca-sem-vencimento.component';
import { PdfReducaoCargaHorariaComponent } from './digp/reducao-carga-horaria/pdf-reducao-carga-horaria/pdf-reducao-carga-horaria.component';


@NgModule({
  declarations: [
    AbonoNatalComponent,
    ContagemQuinquenioComponent,
    ValeTransporteComponent,
    DeclaracoesComponent,
    ReducaoCargaHorariaComponent,
    LicencaSemVencimentoComponent,
    DetalhesQuinquenioComponent,
    DetalhesTransporteComponent,
    DetalhesDeclaracoesComponent,
    DetalhesLicencaSemVencimentoComponent,
    DetalhesCargaHorariaComponent,
    PdfLicencaSemVencimentoComponent,
    PdfReducaoCargaHorariaComponent
  ],
  imports: [
    CommonModule,
    SolicitacoesRoutingModule,
    AppMaterialModule
  ]
})
export class SolicitacoesModule { }

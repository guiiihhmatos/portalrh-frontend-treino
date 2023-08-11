import { AppMaterialModule } from './../../shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeclaracaoRoutingModule } from './declaracao-routing.module';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { DetalhesComponent } from './detalhes/detalhes.component';


@NgModule({
  declarations: [
    RelatorioComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    DeclaracaoRoutingModule,
    AppMaterialModule
  ]
})
export class DeclaracaoModule { }

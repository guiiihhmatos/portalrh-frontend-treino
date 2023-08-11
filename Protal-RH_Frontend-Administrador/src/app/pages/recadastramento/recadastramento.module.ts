import { AppMaterialModule } from './../../shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecadastramentoRoutingModule } from './recadastramento-routing.module';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { DetalhesRecadastroComponent } from './detalhes-recadastro/detalhes-recadastro.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { RecadastroPendenteComponent } from './recadastro-pendente/recadastro-pendente.component'

@NgModule({
  declarations: [
    RelatoriosComponent,
    DetalhesRecadastroComponent,
    RecadastroPendenteComponent
  ],
  imports: [
    CommonModule,
    RecadastramentoRoutingModule,
    AppMaterialModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    provideNgxMask()
  ],
})
export class RecadastramentoModule { }

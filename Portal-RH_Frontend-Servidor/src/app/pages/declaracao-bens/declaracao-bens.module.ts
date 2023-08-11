import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AppMaterialModule } from './../../shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeclaracaoBensRoutingModule } from './declaracao-bens-routing.module';
import { EscolhaComponent } from './escolha/escolha.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ProtocoloDeclaracaoComponent } from './protocolo-declaracao/protocolo-declaracao.component';
import { ImprimirProtocoloDeclaracaoComponent } from './imprimir-protocolo-declaracao/imprimir-protocolo-declaracao.component';
import { DeclaradaComponent } from './declarada/declarada.component';
import { RetificarDeclaracaoComponent } from './retificar-declaracao/retificar-declaracao.component';
import { ExoneracaoComponent } from './exoneracao/exoneracao.component';
import { ConsultarProtocoloComponent } from './consultar-protocolo/consultar-protocolo.component';
import { DeclaracaoEncontradaComponent } from './dialogs/declaracao-encontrada/declaracao-encontrada.component';
import { DeclaracaoNaoEncontradaComponent } from './dialogs/declaracao-nao-encontrada/declaracao-nao-encontrada.component';


@NgModule({
  declarations: [
    EscolhaComponent,
    FormularioComponent,
    ProtocoloDeclaracaoComponent,
    ImprimirProtocoloDeclaracaoComponent,
    DeclaradaComponent,
    RetificarDeclaracaoComponent,
    ExoneracaoComponent,
    ConsultarProtocoloComponent,
    DeclaracaoEncontradaComponent,
    DeclaracaoNaoEncontradaComponent,
  ],
  imports: [
    CommonModule,
    DeclaracaoBensRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ]
})
export class DeclaracaoBensModule { }

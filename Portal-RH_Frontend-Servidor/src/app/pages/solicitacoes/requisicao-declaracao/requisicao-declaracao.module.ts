import { PipeModule } from './../../../shared/pipe/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisicaoDeclaracaoRoutingModule } from './requisicao-declaracao-routing.module';
import { FormularioRequisicaoDeclaracaoComponent } from './formulario-requisicao-declaracao/formulario-requisicao-declaracao.component';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { ProtocoloRequisicaoDeclaracaoComponent } from './protocolo-requisicao-declaracao/protocolo-requisicao-declaracao.component';
import { RequisicaoDeclaracaoRealizadaComponent } from './requisicao-declaracao-realizada/requisicao-declaracao-realizada.component';
import { AndamentoRequisicaoDeclaracaoComponent } from './dialogs/andamento-requisicao-declaracao/andamento-requisicao-declaracao.component';


@NgModule({
  declarations: [
    FormularioRequisicaoDeclaracaoComponent,
    ProtocoloRequisicaoDeclaracaoComponent,
    RequisicaoDeclaracaoRealizadaComponent,
    AndamentoRequisicaoDeclaracaoComponent
  ],
  imports: [
    CommonModule,
    RequisicaoDeclaracaoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    AppMaterialModule
  ]
})
export class RequisicaoDeclaracaoModule { }

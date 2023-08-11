import { AppMaterialModule } from './../../../shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from './../../../shared/pipe/pipe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbonoNatalRoutingModule } from './abono-natal-routing.module';
import { FormularioAbonoNatalComponent } from './formulario-abono-natal/formulario-abono-natal.component';
import { ProtocoloAbonoNatalComponent } from './protocolo-abono-natal/protocolo-abono-natal.component';
import { SolicitacaoAbonoRealizadaComponent } from './solicitacao-abono-realizada/solicitacao-abono-realizada.component';


@NgModule({
  declarations: [
    FormularioAbonoNatalComponent,
    ProtocoloAbonoNatalComponent,
    SolicitacaoAbonoRealizadaComponent
  ],
  imports: [
    CommonModule,
    AbonoNatalRoutingModule,
    PipeModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
  ]
})
export class AbonoNatalModule { }

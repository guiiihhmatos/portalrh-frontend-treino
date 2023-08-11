import { PipeModule } from './../../../shared/pipe/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContagemQuinquenioRoutingModule } from './contagem-quinquenio-routing.module';
import { FormularioContagemQuinquenioComponent } from './formulario-contagem-quinquenio/formulario-contagem-quinquenio.component';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { ProtocoloContagemQuinquenioComponent } from './protocolo-contagem-quinquenio/protocolo-contagem-quinquenio.component';
import { ContagemQuinquenioRealizadaComponent } from './contagem-quinquenio-realizada/contagem-quinquenio-realizada.component';


@NgModule({
  declarations: [
    FormularioContagemQuinquenioComponent,
    ProtocoloContagemQuinquenioComponent,
    ContagemQuinquenioRealizadaComponent,
  ],
  imports: [
    CommonModule,
    ContagemQuinquenioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    AppMaterialModule
  ]
})
export class ContagemQuinquenioModule { }

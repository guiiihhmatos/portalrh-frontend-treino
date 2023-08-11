import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValeTransporteRoutingModule } from './vale-transporte-routing.module';
import { FormularioValeTransporteComponent } from './formulario-vale-transporte/formulario-vale-transporte.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/shared/pipe/pipe.module';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { ProtocoloValeTransporteComponent } from './protocolo-vale-transporte/protocolo-vale-transporte.component';
import { ValeTransporteSolicitadoComponent } from './vale-transporte-solicitado/vale-transporte-solicitado.component';


@NgModule({
  declarations: [
    FormularioValeTransporteComponent,
    ProtocoloValeTransporteComponent,
    ValeTransporteSolicitadoComponent,
  ],
  imports: [
    CommonModule,
    ValeTransporteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    AppMaterialModule
  ]
})
export class ValeTransporteModule { }

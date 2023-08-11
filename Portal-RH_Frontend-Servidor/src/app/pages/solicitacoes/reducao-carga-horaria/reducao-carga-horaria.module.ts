import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReducaoCargaHorariaRoutingModule } from './reducao-carga-horaria-routing.module';
import { FormularioReducaoCargaHorariaComponent } from './formulario-reducao-carga-horaria/formulario-reducao-carga-horaria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/shared/pipe/pipe.module';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { ProtocoloReducaoCargaHorariaComponent } from './protocolo-reducao-carga-horaria/protocolo-reducao-carga-horaria.component';
import { ReducaoCargaHorariaRealizadaComponent } from './reducao-carga-horaria-realizada/reducao-carga-horaria-realizada.component';
import { AndamentoReducaoCargaHorariaComponent } from './dialogs/andamento-reducao-carga-horaria/andamento-reducao-carga-horaria.component';


@NgModule({
  declarations: [
    FormularioReducaoCargaHorariaComponent,
    ProtocoloReducaoCargaHorariaComponent,
    ReducaoCargaHorariaRealizadaComponent,
    AndamentoReducaoCargaHorariaComponent
  ],
  imports: [
    CommonModule,
    ReducaoCargaHorariaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    AppMaterialModule
  ]
})
export class ReducaoCargaHorariaModule { }

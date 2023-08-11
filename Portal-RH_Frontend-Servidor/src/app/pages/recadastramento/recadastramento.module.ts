import { MatIconModule } from '@angular/material/icon';
import { PipeModule } from './../../shared/pipe/pipe.module';
import { AppMaterialModule } from './../../shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecadastramentoRoutingModule } from './recadastramento-routing.module';
import { ProtocoloComponent } from './protocolo/protocolo.component';
import { ImprimirProtocoloComponent } from './imprimir-protocolo/imprimir-protocolo.component';
import { PossuiCadastroComponent } from './possui-cadastro/possui-cadastro.component';
import { FormularioRecadastramentoComponent } from './formulario-recadastramento/formulario-recadastramento.component';
import { FormTesteComponent } from './form-teste/form-teste.component';


@NgModule({
  declarations: [
    ProtocoloComponent,
    ImprimirProtocoloComponent,
    PossuiCadastroComponent,
    FormularioRecadastramentoComponent,
    FormTesteComponent
  ],
  imports: [
    CommonModule,
    RecadastramentoRoutingModule,
    FormsModule,
    AppMaterialModule,
    PipeModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class RecadastramentoModule { }

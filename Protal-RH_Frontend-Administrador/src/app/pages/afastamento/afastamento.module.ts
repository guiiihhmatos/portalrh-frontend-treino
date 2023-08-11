import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AfastamentoRoutingModule } from './afastamento-routing.module';
import { AfastamentoComponent } from './afastamento/afastamento.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AppMaterialModule } from './../../shared/app-material/app-material.module';

@NgModule({
  declarations: [
    AfastamentoComponent
  ],
  imports: [
    CommonModule,
    AfastamentoRoutingModule,
    AppMaterialModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    provideNgxMask()
  ]
})
export class AfastamentoModule { }

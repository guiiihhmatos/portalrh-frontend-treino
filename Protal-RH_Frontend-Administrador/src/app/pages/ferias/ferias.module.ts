import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeriasRoutingModule } from './ferias-routing.module';
import { FeriasComponent } from './ferias/ferias.component';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
    FeriasComponent,
  ],
  imports: [
    CommonModule,
    FeriasRoutingModule,
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
export class FeriasModule { }

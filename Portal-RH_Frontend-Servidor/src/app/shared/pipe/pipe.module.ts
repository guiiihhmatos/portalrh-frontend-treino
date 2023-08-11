import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxMaskDirective, NgxMaskPipe,
  ],
  exports:[
    NgxMaskDirective, NgxMaskPipe,
  ],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    provideNgxMask(),
  ]
})
export class PipeModule { }

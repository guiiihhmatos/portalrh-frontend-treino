import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { PipeModule } from 'src/app/shared/pipe/pipe.module';
import { AndamentoServidorComponent } from './dialogs/andamento-servidor/andamento-servidor.component';
import { AvisoServidorComponent } from './dialogs/aviso-servidor/aviso-servidor.component';


@NgModule({
  declarations: [
    HomePageComponent,
    AndamentoServidorComponent,
    AvisoServidorComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    PipeModule
  ]
})
export class HomeModule { }

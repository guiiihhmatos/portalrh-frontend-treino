import { AppMaterialModule } from './../../shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';

import { NgCircleProgressModule, CircleProgressOptions  } from 'ng-circle-progress';

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    AppMaterialModule,
    NgCircleProgressModule.forRoot({})

  ],
  providers: [CircleProgressOptions]
})
export class HomeModule { }

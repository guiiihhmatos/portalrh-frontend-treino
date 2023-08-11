import { AppMaterialModule } from './shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/home/header/header.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/home/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DigpComponent } from './pages/solicitacoes/digp/digp/digp.component';
import { DirhComponent } from './pages/solicitacoes/dirh/dirh/dirh.component';
import { AlterarSenhaComponent } from './components/home/alterar-senha/alterar-senha.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DigpComponent,
    DirhComponent,
    AlterarSenhaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

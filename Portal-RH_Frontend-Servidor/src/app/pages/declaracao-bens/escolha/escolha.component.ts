import { AuthService } from 'src/app/services/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-escolha',
  templateUrl: './escolha.component.html',
  styleUrls: ['./escolha.component.scss']
})
export class EscolhaComponent {
  anoAtual: number;
  servidor: any;

  constructor(){
    this.anoAtual = new Date().getFullYear();
  }
}

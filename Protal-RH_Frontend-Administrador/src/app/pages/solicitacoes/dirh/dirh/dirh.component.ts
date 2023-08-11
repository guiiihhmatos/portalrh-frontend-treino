import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dirh',
  templateUrl: './dirh.component.html',
  styleUrls: ['./dirh.component.scss']
})
export class DirhComponent {

  constructor
  (
    private router : Router
  ){}

  redirectPages(solicitacao : any)
  {
    this.router.navigate([`solicitacoes/dirh/${solicitacao}`])
  }
}

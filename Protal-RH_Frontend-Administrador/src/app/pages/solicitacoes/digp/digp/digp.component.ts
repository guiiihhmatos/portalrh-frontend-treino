import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-digp',
  templateUrl: './digp.component.html',
  styleUrls: ['./digp.component.scss']
})
export class DigpComponent {

  constructor
  (
    private router : Router
  ){}

  redirectPages(solicitacao : any)
  {
    this.router.navigate([`solicitacoes/digp/${solicitacao}`])
  }

}

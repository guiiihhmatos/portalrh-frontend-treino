import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor
  (
    private auth : AuthService
  )
  {

  }

  get usuarioLogado()
  {
    return this.auth.userValue
  }

  static openSwal({message,text, icon, html}: {message: string, text?: string, icon?: SweetAlertIcon, html?: string}){
    Swal.fire({
      icon: icon||'error',
      title: message,
      text: text,
      html: html,
      confirmButtonText: 'OK',
      confirmButtonColor: '#265a88'
    })
  }


}

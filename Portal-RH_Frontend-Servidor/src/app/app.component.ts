import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Portal RH';
  constructor(
    private auth: AuthService,
    private rota: Router
  ){

  }

  ngOnInit():void{

  }

  get logado(){
    return this.auth.userValue
  }

  static openSwal({message,text, icon, html, redirectHome}: {message: string, text?: string, icon?: SweetAlertIcon, html?: string, redirectHome?: boolean, redirectLogin?: boolean}){
    Swal.fire({
      icon: icon||'error',
      title: message,
      text: text,
      html: html,
      confirmButtonText: 'OK',
      confirmButtonColor: '#265a88'
    }).then(result=>{
      if(redirectHome && result.isConfirmed){
        window.location.href = "/"
      }
    })
  }

}

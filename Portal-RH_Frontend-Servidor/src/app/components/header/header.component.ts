import { AuthService } from 'src/app/services/auth/auth.service';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  nomeServidor: string;
  constructor(private auth: AuthService, private cookie: CookieService){
    let nome = JSON.parse(this.auth.getServidor()).nome.trim()
    this.nomeServidor = nome.slice(0, nome.indexOf(" ")) + nome.slice(nome.lastIndexOf(" "))
  }

  logout(){
    this.auth.logout();
  }
}

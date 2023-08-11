import { AuthService } from '../../../services/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user!: any;
  loginInicial = '';
  nivel = '';

  constructor(private auth: AuthService) {
    this.user = auth.userValue;
  }

  logout() {
    this.auth.logout();
  }

  ngDoCheck() {
    const novoLoginInicial = this.auth.getLoginInicial();
    if (this.loginInicial !== novoLoginInicial) {
      this.loginInicial = novoLoginInicial;
    }

    const novoNivel = this.auth.getNivel();
    if (this.nivel !== novoNivel) {
      this.nivel = novoNivel;
    }
  }


}

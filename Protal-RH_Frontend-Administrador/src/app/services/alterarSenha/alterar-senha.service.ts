import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlterarSenhaService {

  apiUrl = environment.apiUrl + "/admin/trocaSenha"
  headers: any

  constructor
  (
    private http : HttpClient,
    private authService : AuthService
  )
  { }

  // Metodo para alterar senha
  alterarSenha(objeto : any) : Observable<any>
  {
    this.getToken()
    return this.http.patch<any>(this.apiUrl, objeto ,{'headers': this.headers} )
  }

  /* ===== Pegar token de autenticação no cookie ===== */
  private getToken() {

    let token = this.authService.getToken();
    let login =  this.authService.getLogin();

    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .set('LoginAcessoUnico', `${login}`);
  }
}

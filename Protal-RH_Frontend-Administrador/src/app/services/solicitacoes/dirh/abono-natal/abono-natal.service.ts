import { environment } from './../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AbonoNatalService {

  private API = environment.apiUrl + "/solicitacao/abono_natal/admin"

  headers : any

  constructor
  (
    private http : HttpClient,
    private authService : AuthService
  )
  { }

  getAllAbonoByMes(mes : number)
  {
    this.getToken()
    return this.http.get<any>(this.API + `/${mes}`, {headers : this.headers})
  }

  getAllSolicitacoesByExercicio(exercicio : number)
  {
    this.getToken()
    return this.http.get<any>(this.API + `/ano/${exercicio}`, {headers : this.headers})
  }

  /* ===== Pegar token de autenticação no cookie ===== */
  private getToken() {

    let token = this.authService.getToken();

    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
  }

}

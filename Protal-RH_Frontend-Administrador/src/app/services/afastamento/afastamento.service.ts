import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AfastamentoService {

  private API_EMBRAS = environment.apiUrl + "/embras/admin/servidor"

  headers : any

  constructor
  (
    private http : HttpClient,
    private authService : AuthService
  )
  {}

  getAllServidoresAfastados(cdSecretaria : any)
  {
    this.getToken()
    return this.http.get<any>(this.API_EMBRAS + `/afastados/${cdSecretaria}`, { headers : this.headers })
  }

  getServidorByMatricula(registro : any)
  {
    this.getToken()
    return this.http.get<any>(this.API_EMBRAS + `/${registro}`, { headers : this.headers })
  }


   /* ===== Pegar token de autenticação no cookie ===== */
   private getToken() {

    let token = this.authService.getToken();

    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
  }
}

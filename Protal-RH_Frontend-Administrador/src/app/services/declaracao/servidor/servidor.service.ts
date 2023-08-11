import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Servidor } from 'src/app/models/declaracao/servidor.model';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  private API = environment.apiUrl + "/declaracao/admin"
  private API_SERVIDOR = this.API + "/servidor"
  private API_SECRETARIA = this.API + "/secretaria"

  headers : any

  constructor
  (
    private http : HttpClient,
    private authService : AuthService
  ) { }

  getAllServidores(ano : number)
  {
    this.getToken()
    return this.http.get<any>(this.API_SERVIDOR + `/ano/${ano}`, {headers : this.headers});
  }

  getAllServidoresByID(id : number)
  {
    this.getToken()
    return this.http.get<any>(this.API_SERVIDOR + `/${id}`, {headers : this.headers});
  }

  getAllServidoresBySecretariaAndExercicio(secretaria : string, anoExercicio : number)
  {
    this.getToken()
    return this.http.get<any>(this.API_SECRETARIA + `/${secretaria}/${anoExercicio}`, {headers : this.headers});
  }

  getAllSecretariasByExercicio(ano : number)
  {
    this.getToken()
    return this.http.get<any>(this.API_SECRETARIA + `/ano/${ano}`, {headers : this.headers})
  }

  /* ===== Pegar token de autenticação no cookie ===== */
  private getToken() {

    let token = this.authService.getToken();

    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
  }


}

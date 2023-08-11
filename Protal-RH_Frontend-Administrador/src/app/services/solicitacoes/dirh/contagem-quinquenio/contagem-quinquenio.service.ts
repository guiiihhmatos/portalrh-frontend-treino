import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContagemQuinquenioService {

  private API = environment.apiUrl + "/solicitacao/lp/admin"
  private API_STATUS = this.API + "/status/"

  headers : any

  constructor
  (
    private http : HttpClient,
    private authService : AuthService
  ) { }

  /* ===== Adicionar andamento ===== */
  onAddAndamento(objeto : any)
  {
    this.getToken()
    return this.http.post<any>(this.API + "/andamento", objeto, {headers : this.headers})
  }

  /* ===== Listar todas as solicitações ===== */
  getAllSolicitacoes()
  {
    this.getToken()
    return this.http.get<any>(this.API, { headers : this.headers} )
  }

  /* ===== Buscar solicitação por ID ===== */
  getSolicitacaoByID(id : number)
  {
    this.getToken()
    return this.http.get<any>(this.API + `/${id}`, { headers : this.headers})
  }

  /* ===== Listar todas as solicitações por status ===== */
  getAllSolicitacoesByStatus(concluido : boolean)
  {
    this.getToken()
    return this.http.get<any>(this.API_STATUS + `${concluido}`, { headers : this.headers} )
  }

  /* ===== Pegar token de autenticação no cookie ===== */
  private getToken() {

    let token = this.authService.getToken();

    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
  }
}

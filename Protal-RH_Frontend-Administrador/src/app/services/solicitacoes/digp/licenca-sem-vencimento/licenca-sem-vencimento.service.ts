import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LicencaSemVencimentoService {

  private API = environment.apiUrl+ "/solicitacao/lsv/admin"

  headers : any

  constructor
  (
    private http : HttpClient,
    private authService : AuthService
  ) { }

  // ===== Parte admin ===== //

  // Listar todas as solicitações
  getAllSolicitacoes()
  {
    this.getToken()
    return this.http.get<any>(this.API,  {headers : this.headers})
  }

  // Listar todas as solicitações por status
  getAllSolicitacoesStatus(concluido : any)
  {
    this.getToken()
    return this.http.get<any>(this.API + `/status/${concluido}`, {headers : this.headers})
  }

  // listar todas as solicitações por id
  getAllsSolicitacoesById(id : any)
  {
    this.getToken()
    return this.http.get<any>(this.API + `/${id}`, {headers : this.headers})
  }

  // listar todas as solicitações por matricula
  onCheckSolicitacao(objeto : any)
  {
    this.getToken()
    return this.http.patch(this.API + '/atender', objeto, {headers : this.headers}) ///precisa de body
  }

  /* ===== Adicionando Andamento ===== */
  onAddAndamento(objeto : object)
  {
    this.getToken()
    return this.http.post<any>(this.API + '/andamento', objeto, {headers : this.headers})
  }

  /* ===== Pegar token de autenticação no cookie ===== */
  private getToken() {

    let token = this.authService.getToken();

    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
  }
}

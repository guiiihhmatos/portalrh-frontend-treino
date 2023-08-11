import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private API_DECLARACAO = environment.apiUrl + "/declaracao/admin/total/";
  private API_RECADASTRAMENTO = environment.apiUrl + "/recadastramento/admin/total/";
  private API_EMBRAS = environment.apiUrl + "/embras/admin/servidor/total"
  private API_EMBRAS__ANIVERSARIANTES = environment.apiUrl + "/embras/admin/servidor/aniversariantes"

  headers : any

  constructor
  (
    private http : HttpClient,
    private authService : AuthService
  )
  {}

  /* ===== BUSCAR O TOTAL DE DECLARACOES ===== */
  getAllDeclaracoesByExercicio(exercicio : number) : Observable<any>
  {
    this.getToken()
    return this.http.get<any>(this.API_DECLARACAO + `${exercicio}`, {headers : this.headers})
  }

  /* ===== BUSCAR O TOTAL DE SERVIDORES ===== */
  getAllServidor() : Observable<any>
  {
    this.getToken()
    return this.http.get<any>(this.API_EMBRAS, {headers : this.headers})
  }

  /* ===== BUSCAR O TOTAL DE RECADASTRAMENTO ===== */
  getAllRecadastramentos(exercicio : number)
  {
    this.getToken()
    return this.http.get<any>(this.API_RECADASTRAMENTO + `${exercicio}`, {headers : this.headers})
  }

  /* ===== BUSCAR O TOTAL DE RECADASTRAMENTO ===== */
  getAllRecadastramentosByMesAndExercicio(mes : number, exercicio : number)
  {
    this.getToken()
    return this.http.get<any>(this.API_RECADASTRAMENTO + `${mes}/${exercicio}`, {headers : this.headers})
  }

  /* ===== BUSCAR O TOTAl DE SERVIDORES POR SECRETARIA ===== */
  getAllServidorBySecretaria()
  {
    this.getToken()
    return this.http.get<any>(this.API_EMBRAS + "/secretaria", {headers : this.headers})
  }

  /* ===== BUSCAR O TOTAl DE RECADASTRAMENTOS POR SECRETARIA ===== */
  getAllRecadastramentoBySecretaria(exercicio : number)
  {
    this.getToken()
    return this.http.get<any>(this.API_RECADASTRAMENTO + `secretaria/${exercicio}`, {headers : this.headers})
  }

  /* ===== BUSCAR O TOTAl DE DECLARACOES POR SECRETARIA ===== */
  getAllDeclaracoesBySecretaria(exercicio : number)
  {
    this.getToken()
    return this.http.get<any>(this.API_RECADASTRAMENTO + `secretaria/${exercicio}`, {headers : this.headers})
  }

  /* ===== BUSCAR O TOTAl DE DECLARACOES POR SECRETARIA ===== */
  getAllAniversariantesByMes(mes : number)
  {
    this.getToken()
    return this.http.get<any>(this.API_EMBRAS__ANIVERSARIANTES + `/contar/${mes}`, {headers : this.headers})
  }



  /* ===== Pegar token de autenticação no cookie ===== */
  private getToken() {

    let token = this.authService.getToken();

    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
  }


}

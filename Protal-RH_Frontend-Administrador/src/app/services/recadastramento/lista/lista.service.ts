import { AuthService } from '../../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  private headers: any;
  private readonly API = environment.apiUrl + "/lista";

  constructor(
    private authService: AuthService,
    private http: HttpClient) { }

  getSecretarias(): Observable<any[]> {
    this.getToken();
    return this.http.get<any[]>(this.API + "/secretaria");
  }

  getRacaCor(): Observable<any[]> {
    this.getToken();
    return this.http.get<any[]>(this.API + "/raca_cor")
  }

  getEstadoCivil(): Observable<any[]> {
    this.getToken();
    return this.http.get<any[]>(this.API + "/estado_civil")
  }

  getGrauInstrucao(): Observable<any[]> {
    this.getToken();
    return this.http.get<any[]>(this.API + "/grau_instrucao")
  }

  getCursos() : Observable<any[]> {
    this.getToken();
    return this.http.get<any[]>(this.API + "/cursos")
  }

  getMunicipios(): Observable<any[]> {
    this.getToken();
    return this.http.get<any[]>(this.API + "/municipio")
  }

  getMunicipiosByCode(codigo : any): Observable<any[]> {
    this.getToken();
    return this.http.get<any[]>(`${this.API}/municipio/${codigo}`)
  }

  getTipoLogradouroByDescricao(descricao: String): Observable<any[]> {
    this.getToken();
    return this.http.get<any[]>(this.API + "/tipo_logradouro/" + descricao)
  }

  getTiposLogradouros(): Observable<any[]> {
    this.getToken();
    return this.http.get<any[]>(this.API + "/tipo_logradouro")
  }

  private getToken() {
    let token = this.authService.getToken();

    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('SecureToken', token);
  }

}

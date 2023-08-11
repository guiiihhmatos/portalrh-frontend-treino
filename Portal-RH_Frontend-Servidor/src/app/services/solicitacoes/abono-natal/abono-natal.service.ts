import { ProtocoloAbonoNatal } from './../../../models/solicitacoes/abono-natal/protocolo-abono-natal.model';
import { Observable } from 'rxjs';
import { AbonoNatal } from './../../../models/solicitacoes/abono-natal/abono-natal.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environments';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AbonoNatalService {

  private headers: any;
  private readonly API = environment.apiUrl + '/solicitacao/abono_natal/servidor/'

  constructor(private http: HttpClient, private authService: AuthService) { }


  saveSolicitacao(solicitacao: AbonoNatal): Observable<AbonoNatal>{
    this.getToken();
    return this.http.post<AbonoNatal>(this.API, solicitacao, {headers: this.headers});
  }

  getProtocolo(matricula:number, cpf: string, exercicio: number):Observable<ProtocoloAbonoNatal>{
    this.getToken();
    return this.http.get<ProtocoloAbonoNatal>(`${this.API}protocolo/${matricula}/${cpf}/${exercicio}`, {headers: this.headers});
  }

  cancelarSolicitacao(matricula:number, cpf: string, exercicio: number): Observable<any>{
    this.getToken();
    return this.http.delete<any>(`${this.API}apagar/${matricula}/${cpf}/${exercicio}`, {headers: this.headers});
  }

  private getToken() {
    let token = this.authService.getToken();

    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('SecureToken', token);
  }
}

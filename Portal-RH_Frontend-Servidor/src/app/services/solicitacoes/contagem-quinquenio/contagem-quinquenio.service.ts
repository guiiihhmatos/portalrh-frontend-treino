import { Observable } from 'rxjs';
import { ProtocoloContagemQuinquenio } from 'src/app/models/solicitacoes/contagem-quinquenio/protocolo-contagem-quinquenio.model';
import { environment } from './../../../../environments/environments';
import { AuthService } from './../../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContagemQuinquenio } from 'src/app/models/solicitacoes/contagem-quinquenio/contagem-quinquenio.model';

@Injectable({
  providedIn: 'root'
})
export class ContagemQuinquenioService {

  private headers: any;
  private readonly API = environment.apiUrl + '/solicitacao/lp/servidor/'
  constructor(private http: HttpClient, private authService: AuthService) { }

  saveCQ(solicitacaoCQ: ContagemQuinquenio): Observable<ProtocoloContagemQuinquenio>{
    this.getToken();
    return this.http.post<ProtocoloContagemQuinquenio>(this.API, solicitacaoCQ, {headers: this.headers});
  }

  getSolicitacoesCQByCpf(cpf: string): Observable<ProtocoloContagemQuinquenio[]>{
    this.getToken();
    return this.http.get<ProtocoloContagemQuinquenio[]>(this.API+"cpf/"+cpf, {headers: this.headers});
  }
  getSolicitacaoCQ(idProtocolo: number, cpf: string): Observable<ProtocoloContagemQuinquenio>{
    this.getToken();
    return this.http.get<ProtocoloContagemQuinquenio>(this.API+idProtocolo+"/"+cpf, {headers: this.headers});
  }

  private getToken() {
    let token = this.authService.getToken();

    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('SecureToken', token);
  }
}

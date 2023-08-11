import { ProtocoloRequisicaoDeclaracao } from './../../../models/solicitacoes/requisicao-declaracao/protocolo-requisicao-declaracao.model';
import { Observable } from 'rxjs';
import { RequisicaoDeclaracao } from './../../../models/solicitacoes/requisicao-declaracao/requisicao-declaracao.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './../../auth/auth.service';
import { environment } from './../../../../environments/environments';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequisicaoDeclaracaoService {

  private headers: any;
  private readonly API = environment.apiUrl + '/solicitacao/declaracao/servidor/'

  constructor(private http: HttpClient, private authService: AuthService) { }

  saveRequisicaoDeclaracao(declaracao: RequisicaoDeclaracao): Observable<ProtocoloRequisicaoDeclaracao> {
    this.getToken();
    return this.http.post<ProtocoloRequisicaoDeclaracao>(this.API, declaracao, {headers: this.headers});
  }

  listarRequisicoesDeclaracao(matricula: number, cpf: string): Observable<ProtocoloRequisicaoDeclaracao[]>{
    this.getToken();
    return this.http.get<ProtocoloRequisicaoDeclaracao[]>(`${this.API}${matricula}/${cpf}`, {headers: this.headers});
  }

  listarArquivos(protocolo: number): Observable<unknown[]>{
    this.getToken();
    return this.http.get<unknown[]>(this.API + "listaArquivos/" + protocolo, {headers: this.headers});
  }

  downloadArquivo(protocolo: number, url: string): Observable<any> {
    this.getToken();
    return this.http.get<any>(this.API + "download/" + protocolo + "/" + url,{headers : this.headers, observe : 'response' ,responseType : 'blob' as 'json'});

  }

  private getToken() {
    let token = this.authService.getToken();

    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('SecureToken', token);
  }
}

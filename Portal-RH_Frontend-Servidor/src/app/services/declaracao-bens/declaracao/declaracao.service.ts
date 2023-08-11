import { ProtocoloDeclaracaoBens } from '../../../models/declaracao-bens/protocolo-declaracao-bens.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { DeclaracaoBens } from '../../../models/declaracao-bens/declaracao-bens.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DeclaracaoService {

  private headers: any;
  private readonly API = environment.apiUrl + '/declaracao/servidor'

  constructor(private http: HttpClient, private authService: AuthService) { }

  saveDeclaracao(declaracao: DeclaracaoBens): Observable<DeclaracaoBens> {
    this.getToken();
    return this.http.post<DeclaracaoBens>(this.API, declaracao, {headers: this.headers});
  }

  getProtocolo(matricula:number, cpf:string, exercicio: number): Observable<ProtocoloDeclaracaoBens[]>{
    this.getToken();
    return this.http.get<ProtocoloDeclaracaoBens[]>(`${this.API}/protocolo/${matricula}/${cpf}/${exercicio}`, {headers: this.headers});
  }

  private getToken() {
    let token = this.authService.getToken();

    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('SecureToken', token);
  }

}

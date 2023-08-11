import { ProtocoloLicencaSV } from './../../../models/solicitacoes/licenca-sem-vencimento/protocolo-licenca-vencimento.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { AuthService } from '../../auth/auth.service';
import { LicencaSV } from 'src/app/models/solicitacoes/licenca-sem-vencimento/licenca-sem-vencimento.model';

@Injectable({
  providedIn: 'root'
})
export class LicencaSemVencimentoService {

  private headers: any;
  private readonly API = environment.apiUrl + '/solicitacao/lsv/servidor/';
  private readonly ASSETSAPI = "assets/json/solcitacoes/licenca-sem-vencimento";
  constructor(private http: HttpClient, private authService: AuthService) { }

  salvarSolicitacaoLSV(solicitacao: LicencaSV): Observable<ProtocoloLicencaSV>{
    this.getToken();
    return this.http.post<ProtocoloLicencaSV>(this.API, solicitacao, {headers: this.headers});
  }

  getSolicitacoesLSV(matricula: number, cpf: string): Observable<ProtocoloLicencaSV[]>{
    this.getToken();
    return this.http.get<ProtocoloLicencaSV[]>(this.API+matricula+"/"+cpf, {headers: this.headers});
  }

  getTerms():Observable<any[]>{
    return this.http.get<any[]>(this.ASSETSAPI+"/temos.json");
  }

  private getToken() {
    let token = this.authService.getToken();

    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('SecureToken', token);
  }
}

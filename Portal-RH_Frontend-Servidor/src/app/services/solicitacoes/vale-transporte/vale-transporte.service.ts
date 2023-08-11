import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { AuthService } from '../../auth/auth.service';
import { ValeTransporte } from 'src/app/models/solicitacoes/vale-transporte/vale-transporte.model';
import { ProtocoloValeTransporte } from 'src/app/models/solicitacoes/vale-transporte/vale-transporte-protoco.model';

@Injectable({
  providedIn: 'root'
})
export class ValeTransporteService {

  private headers: any;
  private readonly API = environment.apiUrl + '/solicitacao/vt/servidor/'
  constructor(private http: HttpClient, private authService: AuthService) { }


  saveVT(solicitacaoVT: ValeTransporte, arquivos: File[]):Observable<ProtocoloValeTransporte>{
    const formData = new FormData();

    formData.append("solicitacao", new Blob([JSON.stringify(solicitacaoVT)],{type: "application/json"}))
    arquivos.forEach((file:File) => {
      if(file != undefined){
        formData.append("arquivos",file, file.name);
      }
    })

    return this.http.post<ProtocoloValeTransporte>(this.API, formData, {headers: new HttpHeaders().set('SecureToken', this.authService.getToken())});
  }

  // fileUploadVT(matricula: number, files: any[]):Observable<null>{
  //   let token = this.authService.getToken();
  //   const formData = new FormData();
  //   files.forEach(file=>{
  //     formData.append("arquivos", file, file.name)
  //   });
  //   return this.http.post<null>(`${this.API}upload/${matricula}`, formData, {headers: new HttpHeaders().set('SecureToken', token)});
  // }

  getSolicitacoesVT(matricula: number, cpf: string): Observable<ProtocoloValeTransporte[]>{
    this.getToken();
    return this.http.get<ProtocoloValeTransporte[]>(`${this.API}${matricula}/${cpf}`, {headers: this.headers});
  }

  private getToken() {
    let token = this.authService.getToken();

    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('SecureToken', token);
  }
}

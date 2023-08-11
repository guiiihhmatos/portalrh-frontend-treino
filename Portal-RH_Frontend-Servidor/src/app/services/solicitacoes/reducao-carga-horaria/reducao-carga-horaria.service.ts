import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { AuthService } from '../../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReducaoCH } from 'src/app/models/solicitacoes/reducao-carga-horaria/reducao-carga-horaria.model';
import { ProtocoloReducaoCH } from 'src/app/models/solicitacoes/reducao-carga-horaria/protocolo-reducao-carga-horaria.models';

@Injectable({
  providedIn: 'root'
})
export class ReducaoCargaHorariaService {

  private headers: any;
  private readonly API = environment.apiUrl + '/solicitacao/rch/servidor/'
  constructor(private http: HttpClient, private authService: AuthService) { }

  salvalSolicitacaoRCH(solicitacao: ReducaoCH, arquivos: File[]): Observable<ProtocoloReducaoCH>{
    const formData = new FormData();

    formData.append("solicitacao", new Blob([JSON.stringify(solicitacao)],{type: "application/json"}))
    arquivos.forEach((file:File) => {
      if(file != undefined){
        formData.append("arquivos",file, file.name);
      }
    })

    return this.http.post<ProtocoloReducaoCH>(this.API, formData, {headers: new HttpHeaders().set('SecureToken', this.authService.getToken())});
  }

  // fileUploadRCH(protocolo: number, files: any[]):Observable<null>{
  //   let token = this.authService.getToken();
  //   const formData = new FormData();
  //   files.forEach(file=>{
  //     formData.append("arquivos", file, file.name)
  //   });
  //   return this.http.post<any>(`${this.API}upload/${protocolo}`, formData, {headers: new HttpHeaders().set('SecureToken', token)});
  // }

  getSolicitacoes(matricula: number, cpf: string | number){
    this.getToken();
    return this.http.get<ProtocoloReducaoCH[]>(this.API+matricula+"/"+cpf, {headers: this.headers});
  }

  private getToken() {
    let token = this.authService.getToken();

    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('SecureToken', token);
  }
}

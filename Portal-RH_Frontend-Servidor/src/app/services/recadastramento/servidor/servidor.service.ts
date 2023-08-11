import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environments';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  private readonly API = environment.apiUrl + '/recadastramento/servidor';
  // private readonly API_FB = environment.apiUrl + '/servidor/FB/';
  // private readonly API_PG = environment.apiUrl + '/servidor/PG/';
  private headers: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // GetServidorByMatricula(matricula: any) {
  //   this.getToken();
  //   return this.http.get<any>(this.API_FB + matricula, {headers: this.headers});
  // }

  PostServidor(servidor: any, arquivos: File[]) {
    this.getToken();

    const formData = new FormData();

    formData.append("servidor", new Blob([JSON.stringify(servidor)],{type: "application/json"}))
    arquivos.forEach((file:File) => {
      if(file != undefined){
        formData.append("arquivos",file, file.name);
      }
    })
    return this.http.post<any>(this.API, formData, {headers: new HttpHeaders().set('SecureToken', this.authService.getToken())/*.set("Content-Type", "multipart/form-data")*/});
  }

  // getOneServidor(matricula : any, cpf : any)
  // {
  //   this.getToken()
  //   return this.http.get<any>(this.API + `protocolo/${matricula}/${cpf}/2023`, {headers : this.headers})
  // }
  getProtocolo(matricula: number, cpf: any, exercicio: number)
  {
    this.getToken();
    // exercicio = 2023;
    return this.http.get<any>(this.API + `/protocolo/${matricula}/${cpf}/${exercicio}`, {headers: this.headers})
  }

  private getToken() {

    let token = this.authService.getToken();

    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('SecureToken', token);
  }

}

import { environment } from './../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeclaracoesGeralService {

  private API = environment.apiUrl+ "/solicitacao/declaracao/admin"

  headers : any

  constructor
  (
    private http : HttpClient,
    private authService : AuthService
  ) { }

  // ===== Parte admin ===== //

  // Listar todas as solicitações
  getAllSolicitacoes()
  {
    this.getToken()
    return this.http.get<any>(this.API,  {headers : this.headers})
  }

  // Listar todas as solicitações por status
  getAllSolicitacoesStatus(concluido : any)
  {
    this.getToken()
    return this.http.get<any>(this.API + `/status/${concluido}`, {headers : this.headers})
  }

  // listar todas as solicitações por id
  getAllsSolicitacoesById(id : any)
  {
    this.getToken()
    return this.http.get<any>(this.API + `/${id}`, {headers : this.headers})
  }

  // listar todas as solicitações por matricula
  onCheckSolicitacao(objeto : any)
  {
    this.getToken()
    return this.http.patch(this.API + '/atender', objeto, {headers : this.headers})
  }

  /* ===== Adicionando Andamento ===== */
  onAddAndamento(objeto: object, arquivos: File[]):Observable<any>{
    const formData = new FormData();

    formData.append("andamento", new Blob([JSON.stringify(objeto)],{type: "application/json"}))
    arquivos.forEach((file:File) => {
      if(file != undefined){
        formData.append("arquivos",file, file.name);
      }
    })

    return this.http.post<any>(this.API + '/andamento', formData, {headers: new HttpHeaders().set('Authorization',`Bearer ${this.authService.getToken()}`)});
  }

  /* ===== Cancelar Solicitação ===== */
  onCancelar(objeto : object)
  {
    this.getToken()
    return this.http.patch<any>(this.API + "/cancelar", objeto, {headers : this.headers})
  }

  /* ===== Pegar token de autenticação no cookie ===== */
  private getToken() {

    let token = this.authService.getToken();

    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
  }

}

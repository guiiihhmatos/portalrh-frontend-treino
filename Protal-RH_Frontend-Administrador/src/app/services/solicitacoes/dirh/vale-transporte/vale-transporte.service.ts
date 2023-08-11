import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValeTransporteService {

  private API = environment.apiUrl + "/solicitacao/vt/admin"

  headers : any

  constructor
  (
    private authService : AuthService,
    private http : HttpClient
  ) { }

  /* ===== Pegar todas as solicitações por status ===== */
  getAllSolicitacoesByStatus(concluido : boolean)
  {
    this.getToken()
    return this.http.get<any>(this.API + `/status/${concluido}`, {headers : this.headers})
  }

  /* ===== Buscar Solicitação por ID ===== */
  getSolicitacaoById(id : number)
  {
    this.getToken()
    return this.http.get<any>(this.API + `/${id}`, {headers : this.headers})
  }

  /* ===== Listar todos os arquivos enviados pelo servidor ===== */
  getFilesServidor(matricula : number)
  {
    this.getToken()
    return this.http.get<any>(this.API + `listaArquivos/${matricula}`, {headers : this.headers})
  }

  /* ===== Adicionando Andamento ===== */
  onAddAndamento(objeto : object)
  {
    this.getToken()
    return this.http.post<any>(this.API + '/andamento', objeto, {headers : this.headers})
  }

  /* ===== Marcar como concluído ===== */
  onconcluido(objeto : object)
  {
    this.getToken()
    return this.http.patch<any>(this.API + '/atender', objeto, {headers : this.headers})
  }

  /* ===== Cancelar Solicitação ===== */
  onCancelar(objeto : object)
  {
    this.getToken()
    return this.http.patch<any>(this.API + "/cancelar", objeto, {headers : this.headers})
  }

  /* ===== Buscar todos os arquivos do servidor ===== */
  getAllFilesServidor(matricula : any)
  {
    this.getToken()
    return this.http.get<any>(this.API + `/listaArquivos/${matricula}`,{headers : this.headers})
  }

  /* ===== Ver arquivo selecionado ===== */
  getSelectedFile(urlArquivo : any)
  {
    this.getTokenAndFile()
    return this.http.get<any>(this.API + `/download/${urlArquivo}`, {headers : this.headers, observe : 'response' ,responseType : 'blob' as 'json'})
  }

  /* ===== Pegar token de autenticação no cookie ===== */
  private getToken() {

    let token = this.authService.getToken();

    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
  }

   /* ===== Pegar token de autenticação no cookie com file content ===== */
   private getTokenAndFile() {

    let token = this.authService.getToken();

    this.headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
  }

}

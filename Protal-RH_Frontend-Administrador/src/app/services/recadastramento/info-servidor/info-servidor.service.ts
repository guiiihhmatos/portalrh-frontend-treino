import { AuthService } from '../../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfoServidorService {

  private readonly API = environment.apiUrl + '/recadastramento/admin';
  private readonly API_SERVIDOR = this.API + '/servidor';
  private readonly API_DOWNLOAD = this.API + '/download';

  headers : any

  constructor
  (
    private httpClient : HttpClient,
    private authService : AuthService
  )
  { }

  /* ===== Buscar todos os servidores ===== */
  getAllServidores(exercicio : number) : Observable<any[]>
  {
    this.getToken()
    return this.httpClient.get<any[]>(this.API_SERVIDOR + `/ano/${exercicio}`, {headers : this.headers})
  }

  /* ===== Buscar Servidores por ID ===== */
  getAllServidorByID(id : number)
  {
    this.getToken()
    return this.httpClient.get<any>(this.API_SERVIDOR + `/${id}`, {headers : this.headers})
  }

  /* ===== Buscar Servidores por matricula ===== */
  getAllServidorBySecretaria(secretaria : any, exercicio : any)
  {
    this.getToken()
    return this.httpClient.get<any>(this.API + `/secretaria/${secretaria}/${exercicio}`, {headers : this.headers})
  }

  /* ===== Buscar Servidores por ano ===== */
  getAllServidorByAno(ano : any)
  {
    this.getToken()
    return this.httpClient.get<any>(this.API_SERVIDOR + "/ano/" + ano, {headers : this.headers})
  }

  /* ===== Buscar Servidores por ano e secretaria ===== */
  getAllServidorByAnoAndSecretaria(ano : any, secretaria : any)
  {
    this.getToken()
    return this.httpClient.get<any>(this.API + "/secretaria/" + secretaria + "/" + ano, {headers : this.headers})
  }

  /* ===== Buscar todos os servidores do mes atual ===== */
  getAllServidoresByMes(mes : number, exercicio : number) : Observable<any[]>
  {
    this.getToken()
    return this.httpClient.get<any[]>(this.API_SERVIDOR + `/${mes}/${exercicio}`, {headers : this.headers})
  }

  /* ===== Buscar todos os servidores do mes atual ===== */
  getAllServidoresWithRecadastroPendente(mes : number, exercicio : number) : Observable<any[]>
  {
    this.getToken()
    return this.httpClient.get<any[]>(this.API_SERVIDOR + `/devedores/${mes}/${exercicio}`, {headers : this.headers})
  }



  /* ===== Validar e Invalidar recadastramento ===== */
  putValidar(id : number, usuario : any)
  {
    this.getToken()
    return this.httpClient.patch<any>(this.API + `/validar/${id}`, usuario , {headers : this.headers})
  }

  putInvalidar(id : number, usuario : any)
  {
    this.getToken()
    return this.httpClient.patch<any>(this.API + `/invalidar/${id}`, usuario ,{headers : this.headers})
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

  /* ===== Buscar todos os arquivos do servidor ===== */
  getAllFilesServidor(matricula : any, exercicio : any)
  {
    this.getToken()
    return this.httpClient.get<any>(this.API + `/listaArquivos/${matricula}/${exercicio}`,{headers : this.headers})
  }

  /* ===== Ver arquivo selecionado ===== */
  getSelectedFile(urlArquivo : any)
  {
    this.getTokenAndFile()
    return this.httpClient.get<any>(this.API_DOWNLOAD + `/${urlArquivo}`, {headers : this.headers, observe : 'response' ,responseType : 'blob' as 'json'})
  }


}

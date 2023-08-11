import { environment } from './../../../environments/environments';
import { Usuario } from './../../models/auth/usuario.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<Usuario>;
  public user: Observable<Usuario>;
  private role = ''

  constructor
    (
      private http: HttpClient,
      private cookieService: CookieService,
      private rota: Router,
    ) {
    this.userSubject = new BehaviorSubject<any>(
      this.cookieService.get('cookie-cpf,')
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.cookieService.get('cookie-cpf')
  }

  public get roleValue() {
    return this.role
  }

  login(users: any) {

    let user = window.btoa(users.cpf)
    let password = window.btoa(users.senha)

    let objeto = {
      "cpf": user.toString(),
      "senha": password.toString()
    }

    return this.http
      .post<any>(`${environment.apiUrl}/embras/login/${users.matricula}`, objeto)
      .pipe(
        map(({ token, servidor, andamentos }) => {
          let user: Usuario = {
            token: token
          };

          this.role = 'user'

          if (this.cookieService.get('cookie-matricula') == '' || this.cookieService.get('cookie-matricula') == null || this.cookieService.get('cookie-matricula') == undefined) {
            this.cookieService.set('cookie-token', this.encode(token), 1 / 24, '/')
            this.cookieService.set('cookie-cpf', this.encode(users.cpf), 1 / 24, '/')
            this.cookieService.set('cookie-matricula', this.encode(users.matricula), 1 / 24, '/')
            this.cookieService.set('cookie-servidor', this.encode(JSON.stringify(servidor)), 1 / 24, '/')
            this.cookieService.set('cookie-andamentos', this.encode(JSON.stringify(andamentos)), 1 / 24, '/');
          }

          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    this.cookieService.deleteAll('/')
    this.cookieService.deleteAll('/servidor')
    location.reload();
  }


  // Método para codificar uma string em base64
  encode(data: string): string {
    return btoa(data);
  }

  // Método para decodificar uma string em base64
  decode(data: string): string {
    return atob(data);
  }

  getToken() {
    const token = this.cookieService.get('cookie-token');
    return this.decode(token);
  }

  getMatricula() {
    const matricula = this.cookieService.get('cookie-matricula');
    return this.decode(matricula);
  }

  getServidor() {
    const servidor = this.cookieService.get('cookie-servidor')
    return this.decode(servidor);
  }

  getCpf() {
    const cpf = this.cookieService.get('cookie-cpf')
    return this.decode(cpf);
  }

  getAndamentos() {
    const andamentos = this.cookieService.get('cookie-andamentos');
    return this.decode(andamentos)
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LoginAdmin } from 'src/app/models/home/loginAdmin.model';
import { UsuarioAdmin } from 'src/app/models/home/usuarioAdmin.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioSubject: BehaviorSubject<UsuarioAdmin>;
  public user: Observable<UsuarioAdmin>;

  private role = ''

  constructor
  (
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  )
  {
    this.usuarioSubject = new BehaviorSubject<any>(
      this.cookieService.get('cookie-login')
    );
    this.user = this.usuarioSubject.asObservable();
  }

  public get userValue()
  {
    let login = this.cookieService.get('cookie-login')
    return this.decode(login)
  }

  public get roleValue()
  {
    return this.role
  }

  login(users : any)
  {

    let user =  window.btoa(users.username)
    let password =  window.btoa(users.password)

    let objeto = {
      "login" : user.toString(),
      "senha" : password.toString()
    }

    return this.http
      .post<any>(`${environment.apiUrl}/admin/login`,  objeto )
      .pipe(
        map(({token, usuario}) => {

          let user: UsuarioAdmin = {
            token: token,
          };

          let credencial: UsuarioAdmin = {
            usuario: usuario.nome,
          };

          let login : LoginAdmin = {
            login : usuario.login
          }

            this.role = usuario.nivelAcesso;

            this.cookieService.set('cookie-token', this.encode(token), 0.5, '/')
            this.cookieService.set('cookie-usuario',this.encode(usuario.nome) , 0.5, '/')
            this.cookieService.set('cookie-login',this.encode(usuario.login), 0.5, '/')
            this.cookieService.set('cookie-id',this.encode(usuario.id), 0.5, '/')
            this.cookieService.set('cookie-loginInicial',this.encode(usuario.loginInicial), 0.5, '/')
            this.cookieService.set('cookie-registro',this.encode(usuario.registro), 0.5, '/')
            this.cookieService.set('cookie-nivel',this.encode(usuario.nivelAcesso), 0.5, '/')
            this.cookieService.set('cookie-cor', '#ffff8f', 0.5, '/')
            this.cookieService.set('cookie-corTexto', '#000000', 0.5, '/')

          this.usuarioSubject.next(user);

          return user;
        }),
      );
  }

  // Método para codificar uma string em base64
  encode(data: string): string {
    return btoa(data);
  }

  // Método para decodificar uma string em base64
  decode(data: string): string {
    return atob(data);
  }

  logout() {

   this.cookieService.deleteAll('/');
   this.cookieService.deleteAll('/login');
   location.reload()

  }

  getToken()
  {
    let token = this.cookieService.get('cookie-token')
    return this.decode(token)
  }

  getNivel()
  {
    let nivel = this.cookieService.get('cookie-nivel')
    return this.decode(nivel)
  }

  getUser()
  {
    let user = this.cookieService.get('cookie-usuario')
    return this.decode(user)
  }

  getLogin()
  {
    let login = this.cookieService.get('cookie-login')
    return this.decode(login)
  }

  getRegistro()
  {
    let registro = this.cookieService.get('cookie-registro')
    return this.decode(registro)
  }

  getLoginInicial()
  {
    let loginInicial = this.cookieService.get('cookie-loginInicial')
    return this.decode(loginInicial)
  }

  getId()
  {
    let id = this.cookieService.get("cookie-id");
    return this.decode(id)
  }

}

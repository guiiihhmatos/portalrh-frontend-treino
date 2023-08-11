import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from 'src/app/app.component';
import { AlterarSenhaService } from 'src/app/services/alterarSenha/alterar-senha.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss']
})
export class AlterarSenhaComponent {

  alterarSenhaForm: FormGroup;
  error = '';

  user: any

  message = ''
  id = 0

  alertSenha = ''
  loginInicial = ''

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private alterarSenhaService: AlterarSenhaService,
    private cookieService: CookieService
  ) {
    this.alterarSenhaForm = this.formBuilder.group({
      senhaAtual: ['', Validators.required],
      novaSenha: ['', Validators.required],
      confirmarSenha: ['', Validators.required],
    });


  }

  ngOnInit() {

    this.user = this.authenticationService.getUser()

    this.id = parseInt(this.authenticationService.getId())

    this.loginInicial = this.authenticationService.getLoginInicial()

    this.getMessage(this.loginInicial)
  }

  clearError() {
    this.error = '';
  }

  getMessage(loginInicial: string) {
    if (loginInicial == 'true') {
      this.alertSenha = 'Sua senha foi resetada! Para acessar o sistema você precisa alterar a sua senha.'
    } else {
      this.alertSenha = ''
    }
  }

  alterarSenha(form: any) {

    let senhaNova = window.btoa(form.novaSenha)
    let senhaAntiga = window.btoa(form.senhaAtual)

    let objeto = {
      "id": this.id,
      "senhaAntiga": senhaAntiga.toString(),
      "senhaNova": senhaNova.toString()
    }

    if (form.novaSenha == form.confirmarSenha) {
      this.error = ''

      if (form.senhaAtual != form.novaSenha) {

        this.alterarSenhaService.alterarSenha(objeto).subscribe({
          next: () => {
            this.message = "Senha alterada com sucesso"
            this._snackBar.open(this.message, '', { duration: 3000 });
            this.cookieService.delete('cookie-loginInicial')
            this.cookieService.set('cookie-loginInicial', this.authenticationService.encode('false'), 0.5, '/')

            this.router.navigate(['home'])
            // location.reload();
          },
          error: () => {
            this.onError("Erro ao alterar Senha - Senha atual Incorreta")
          }
        })
      }
      else {
        this.onError("Senha Atual identica a nova senha")
      }

    }
    else {
      this.onError("Nova senha diferente da confirmação de senha")
    }
  }

  onBack() {
    this.location.back()
  }

  onSuccess() {
    this._snackBar.open(this.message, '', { duration: 3000 });
    this.onBack();
  }

  private onError(message: string) {
    AppComponent.openSwal({ message })
  }

}

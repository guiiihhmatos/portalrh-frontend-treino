
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error = '';
  val = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthService

  ) {
    this.loginForm = this.formBuilder.group({
      matricula : ['', Validators.required],
      cpf: ['', Validators.required],
      senha: ['', Validators.required],
    });


  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService
      .login(this.loginForm.value)
      .pipe(first())
      .subscribe({
        next: () => {

          this.router.navigate(['']), open('', "_self")
        },
        error: (error) => {

            this.error = 'Usuário ou senha inválidos'
            this.val = true

        },
      });
  }

}

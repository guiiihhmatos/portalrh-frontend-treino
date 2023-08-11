import { AuthService } from '../../../services/auth/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });


  }

  ngOnInit() {

  }

  get f() {
    return this.loginForm.controls;
  }

  clearError() {
    this.error = '';
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(this.loginForm.value)
      .pipe(first())
      .subscribe({
        next: () => {

          let loginInicial = this.authService.getLoginInicial()

          if (loginInicial == 'true') {
            this.router.navigate(['/trocar-senha'])
          }
          else {
            this.router.navigate(['/home'])
          }
        },
        error: (error) => {
          if (error.status === 401) {
            AppComponent.openSwal({ message: "Usuário ou senha inválidos" })
          }
        },
      });
  }


}

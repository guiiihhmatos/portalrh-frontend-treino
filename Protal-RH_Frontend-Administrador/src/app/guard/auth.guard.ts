import { AuthService } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor
  (
    private router: Router,
    private authServiceAdmin: AuthService,
  )
  {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const allowedLevels = route.data['nivel'] as string[];
    const userLevel = this.authServiceAdmin.getNivel();

    const currentUser = this.authServiceAdmin.userValue;
    let loginInicial = this.authServiceAdmin.getLoginInicial()

    if (currentUser && loginInicial == 'false') {

      if (allowedLevels.includes(userLevel)) {
        return true;
      }
      else
      {

        if(userLevel == 'NIVEL_1')
        {
          this.router.navigate(['/afastamentos/relatorio'])
          return false
        }
        return false
      }
    }

    if(loginInicial == 'false') this.router.navigate(['']);
      else this.router.navigate(['/trocar-senha'])

    return false;
}


}

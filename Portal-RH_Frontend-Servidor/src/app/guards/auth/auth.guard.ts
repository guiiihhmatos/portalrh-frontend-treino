import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    const currentUser = this.auth.userValue;

    if(currentUser){
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}

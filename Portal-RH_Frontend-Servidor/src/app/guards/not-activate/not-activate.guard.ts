import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotActivateGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    const userToken = this.auth.userValue;

    if(userToken){
      this.router.navigate(['']);
      return false;
    } else {
      return true;
    }
  }

}

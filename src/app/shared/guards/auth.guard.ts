import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let logged: boolean

    this.auth.getUserData.subscribe(data => {
      logged = !!data
    })

    if (logged) {
      console.log('Navegação autorizada. Redirecionado...');

      return true
    }
    console.log('Navegação negada. Redirecionando...');
    this.router.navigate(['/login/signin'])
    return false


  }

}

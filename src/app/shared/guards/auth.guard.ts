import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { AuthService} from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authSvc: AuthService, private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;
    return this.authSvc.userData$.pipe(
      map( user =>{
        if(!user){
          //Redirect to home
          this.router.navigate(['/login'])
          return false;
        }else{
          //this.router.navigate(['/homeUser'])
          return true;
        }
      })
    );
  }
  
}

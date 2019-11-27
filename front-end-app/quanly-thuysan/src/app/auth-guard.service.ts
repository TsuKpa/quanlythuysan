import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from './login/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: LoginService, private router: Router) { }

// canActivate(): boolean {
//     return true;
// }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    let url: string = state.url;
    return new Promise((resolve, reject) => {
      this.auth.isLoggedIn().subscribe(data => {
        console.log(data);
        resolve(true);
      }
      , error => {
        console.log(error);
        if (error.status == 500){
          console.error("Loi server hoac chua import card");
          resolve(false);
        }
        else if (error.status == 401){
          console.error("Chua chung thuc");
          resolve(false);
        }
        //console.log(error);
        this.router.navigate(['/login']);
        resolve(false);
      }
      );
    });
  }
}

import { Component } from '@angular/core';
import {LoginService} from './login/login.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthGuardService} from './auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quanly-thuysan';
  private pingURL = 'https://192.168.184.158:3000/api/system/ping';

  constructor (private auth: LoginService, private router: Router,
               private aut: AuthGuardService,
               private http: HttpClient){}

  logout() {
    console.log('ok');
    this.auth.isLoggedIn().subscribe(data => {
      console.log(data);
      if (data){
        this.auth.checkWallet().then(res => {
          console.log(res);
          this.auth.deleteCard(res[0].name).then((r)=> {
            console.log(r);
            this.router.navigate(['/login']);
          }).catch(error => {
            console.log(error);
          });
        });
      }
    }, error => {
	console.log(error);
	this.router.navigate(['/login']);
	});
  }

  profile() {
    this.auth.isLoggedIn()
      .subscribe(data => {
        console.log(data);
        var a = data["participant"].split('#');
        this.router.navigate(['profile', a[1]]);
      });
  }


  myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "header") {
      x.className += " responsive";
    } else {
      x.className = "header";
    }
  }
}


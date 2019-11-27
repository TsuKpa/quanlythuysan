import {Component, OnInit} from '@angular/core';
import {KJUR} from 'jsrsasign';
import {LoginService} from './login.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  loginForm = new loginForm();
  isLoading: boolean = false;
  card;
  private fileToUpload: File = null;
  status: string;
  private pingURL = 'http://192.168.184.158:3000/api/system/ping';

  constructor(private loginS: LoginService, private http: HttpClient,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.username!=''&&this.fileToUpload!=null){
    this.submitted = true;
    // @ts-ignore
    this.isLoading = true;
    var time = Date.now();
    this.loginForm.timestamp = time;
    var token = this.encode(this.loginForm);
    console.log(token);
    this.status = 'Sending token...';
    this.loginS.sendToken(token).subscribe((result) => {
      console.log(result);
    }, error => {
      console.log(error);
      if (error.status == 200) {
          this.status = 'Importing Card...';
          this.loginS.importCard(this.fileToUpload).then((data) => {
            console.log(data);
            console.log('imported');
            this.status = 'Card imported.';
            //get id identity
            this.loginS.isLoggedIn().subscribe(data => {
              var id = data['identity'].split('#');
              //console.log(id);
              this.http.get(`http://192.168.184.158:3000/api/system/identities/${id[1]}`, {withCredentials: true})
                .subscribe(data => {
                  var name = data['name']+'@quanlythuysan';
                  this.status = 'Setting default card. Please wait...';
                  this.loginS.setDefaultCard(name).then(res => {
                    console.log(res);
                    this.router.navigate(['/product']);
                    }
                  );
                });
            }, error => {
              if (error.status == 500){
                this.http.get(`${this.pingURL}`, {withCredentials: true}).subscribe(data => {
                  console.log(data);
                  if (data){
                    this.loginS.checkWallet().then(res => {
                      //console.log(res);
                      this.loginS.deleteCard(res[0].name).then((r)=> {
                        console.log('deleted');
                        //this.router.navigate(['/login']);
                      }).catch(error => {
                        console.log(error);
                      });
                    });
                  }
                }, error => {console.log(error);});
                this.isLoading = true;
                this.submitted = true;
                var a = new Promise((resolve, reject) => {
                    this.status = 'Đã xảy ra lỗi vui lòng liên hệ admin để được hỗ trợ!';
                    resolve(this.status);
                });
                a.then(() => {
                  setInterval(event => {
                    this.isLoading = false;
                    this.submitted = false;
                  }, 5000);
                  }
                );
              }
            });
          }, error => {
            console.log(error);
          });
      } else {
        this.isLoading = true;
        this.submitted = true;
        var a = new Promise((resolve, reject) => {
            this.status = 'Fail to connect to server.';
            resolve(this.status);
        });
        a.then(() => {
            setInterval(event => {
              this.isLoading = false;
              this.submitted = false;
            },5000);
          }
        );
        console.log('fail to connect to server!');
      }
    });
  }
  }

  encode(object) {
    var oHeader = {alg: 'HS256', typ: 'JWT'};
    var sHeader = JSON.stringify(oHeader);
    var sPayload = JSON.stringify(object);
    return KJUR.jws.JWS.sign('HS256', sHeader, sPayload, 'secret');
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

}

export class loginForm {
  timestamp: number;
  username: string;
}


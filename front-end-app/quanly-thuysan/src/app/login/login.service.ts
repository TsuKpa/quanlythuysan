import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {error} from 'util';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private callbackURL = 'http://192.168.184.158:3000/auth/jwt/callback';
  private importURL = 'http://192.168.184.158:3000/api/Wallet/import';
  private checkURL = 'http://192.168.184.158:3000/api/Wallet';
  private pingURL = 'http://192.168.184.158:3000/api/system/ping';
  private deleteURL = 'http://192.168.184.158:3000/api/wallet';
  private identityURL: 'http://192.168.184.158:3000/api/system/identities';


  constructor(private http: HttpClient, private router: Router) {
  }

  sendToken(token: string) {
    return this.http.get(`${this.callbackURL}`,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' +token), withCredentials: true});
  };

  importCard(fileToUpload: File) {
    const formData = new FormData();
    formData.append('card', fileToUpload, fileToUpload.name);
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    headers.set('Accept', 'application/json');
    return this.http.post(`${this.importURL}`, formData,
      {withCredentials: true, headers}).toPromise();
  }

  checkWallet(){
    return this.http.get(`${this.checkURL}`, {withCredentials: true}).toPromise();
  }

  exportCard(name){
    return this.http.get(`${this.deleteURL}/${name}/export`, {withCredentials: true, responseType: 'blob'}).toPromise();
  }

  deleteCard(name){
    return this.http.delete(`${this.deleteURL}/${name}`, {withCredentials: true}).toPromise();
  }

  setDefaultCard(name){
    let body = {};
    return this.http.post(`${this.deleteURL}/${name}/setDefault`, body, {withCredentials: true}).toPromise();
  }

  getIndentityById(id){
    return this.http.get(`${this.identityURL}/${id}`, {withCredentials: true});
  }

  //ping
  isLoggedIn(){
    return this.http.get(`${this.pingURL}`, {withCredentials: true});
  }
}

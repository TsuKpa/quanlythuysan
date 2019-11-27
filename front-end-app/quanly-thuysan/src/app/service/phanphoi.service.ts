import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PhanPhoi} from '../model/phanphoi';

@Injectable({
  providedIn: 'root'
})
export class PhanphoiService {
  private baseURL = 'http://192.168.184.158:3000/api/org.hlfc.qlts.TaoGiaiDoanPhanPhoi';
  private getURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.GiaiDoanPhanPhoi';
  private parURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.NhaPhanPhoi';

  constructor(private http: HttpClient) { }
  getGDPP(id: string): Observable<any> {
    return this.http.get(`${this.getURL}/${id}` , {withCredentials: true});
  }
  //get participant NPP
  getNPP(id: string): Observable<any> {
    return this.http.get(`${this.parURL}/${id}` , {withCredentials: true});
  }
  // tslint:disable-next-line:ban-types
  createGDPP(PhanPhoi: Object): Observable<Object> {
    return this.http.post(`${this.baseURL}`, PhanPhoi , {withCredentials: true});
  }
}

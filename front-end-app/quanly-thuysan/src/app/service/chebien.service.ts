import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CheBien} from '../model/chebien';

@Injectable({
  providedIn: 'root'
})
export class ChebienService {
  private baseURL = 'http://192.168.184.158:3000/api/org.hlfc.qlts.TaoGiaiDoanCheBien';
  private getURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.GiaiDoanCheBien';
  private parURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.NhaCheBien';

  constructor(private http: HttpClient) { }
  getGDCB(id: string): Observable<any> {
    return this.http.get(`${this.getURL}/${id}` , {withCredentials: true});
  }
//get participant NCB
  getNCB(id: string): Observable<any> {
    return this.http.get(`${this.parURL}/${id}` , {withCredentials: true});
  }
  // tslint:disable-next-line:ban-types
  createGDCB(CheBien: Object): Observable<Object> {
    return this.http.post(`${this.baseURL}`, CheBien , {withCredentials: true});
  }
}

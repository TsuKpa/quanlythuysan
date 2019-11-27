import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BanLe} from '../model/banle';

@Injectable({
  providedIn: 'root'
})
export class BanleService {
  private baseURL = 'http://192.168.184.158:3000/api/org.hlfc.qlts.TaoGiaiDoanBanLe';
  private getURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.GiaiDoanBanLe';
  private parURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.NhaBanLe';

  constructor(private http: HttpClient) { }
  getGDBL(id: string): Observable<any> {
    return this.http.get(`${this.getURL}/${id}`, {withCredentials: true});
  }
  //get participant NPP
  getNBL(id: string): Observable<any> {
    return this.http.get(`${this.parURL}/${id}` , {withCredentials: true});
  }
  // tslint:disable-next-line:ban-types
  createGDBL(BanLe: Object): Observable<Object> {
    return this.http.post(`${this.baseURL}`, BanLe , {withCredentials: true});
  }
}

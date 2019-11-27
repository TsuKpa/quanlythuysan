import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {NuoiNgLieu} from '../model/nuoinl';

@Injectable({
  providedIn: 'root'
})
export class NuoinlService {
  private baseURL = 'http://192.168.184.158:3000/api/org.hlfc.qlts.TaoGiaiDoanNuoiNguyenLieu';
  private getURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.GiaiDoanNuoiNguyenLieu';
  private parURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.TrangTraiNuoiNguyenLieu';

  constructor(private http: HttpClient) { }
  getGDNNL(id: string): Observable<any> {
    return this.http.get(`${this.getURL}/${id}` , {withCredentials: true});
  }
//get participant TTNNL
  getTTNNL(id: string): Observable<any> {
    return this.http.get(`${this.parURL}/${id}` , {withCredentials: true});
  }
  // tslint:disable-next-line:ban-types
  createGDNNL(NuoiNgLieu: Object): Observable<Object> {
    return this.http.post(`${this.baseURL}`, NuoiNgLieu , {withCredentials: true});
  }
}

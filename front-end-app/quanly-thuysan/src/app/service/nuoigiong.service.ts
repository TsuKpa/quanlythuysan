import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NuoiGiong} from '../model/nuoigiong';

@Injectable({
  providedIn: 'root'
})
export class NuoiGiongService {
  private baseURL = 'http://192.168.184.158:3000/api/org.hlfc.qlts.TaoGiaiDoanNuoiGiong';
  private getURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.GiaiDoanNuoiGiong';
  private parURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.TrangTraiNuoiGiong';

  constructor(private http: HttpClient) {}

  getGDNG(id: string): Observable<any> {
    return this.http.get(`${this.getURL}/${id}` , {withCredentials: true});
  }
  //get participant TTNG
  getTTNG(id: string): Observable<any> {
    return this.http.get(`${this.parURL}/${id}` , {withCredentials: true});
  }

  // tslint:disable-next-line:ban-types
  createGDNG(NuoiGiong: Object): Observable<Object> {
    return this.http.post(`${this.baseURL}`, NuoiGiong , {withCredentials: true});
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ao} from '../model/ao';
import {TrangTrai} from '../model/trangtrai';
import {PhuongTien} from '../model/phuongtien';
import {CoSo} from '../model/coso';
import {NgLieu} from '../model/nglieu';
import {SanPhamNgoai} from '../model/sanphamngoai';
import {SanPhamNoi} from '../model/sanphamnoi';


@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private AoNGURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.AoNG';
  private AoNNLURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.AoNNL';
  private TTNGURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.TrangTraiNG';
  private TTNNLURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.TrangTraiNNL';
  private NgLURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.NguyenLieu';
  private PTURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.PhuongTien';
  private CSCBURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.CoSoCB';
  private CSPPURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.CoSoPP';
  private CSBLURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.CoSoBL';
  private SPNURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.SanPhamNgoai';
  private SPURL = 'http://192.168.184.158:3001/api/org.hlfc.qlts.SanPhamNoi';

  constructor(private http: HttpClient) { }

  getAoNG(id: string): Observable<any> {
    return this.http.get(`${this.AoNGURL}/${id}`, {withCredentials: true});
  }

  getAoNGList(): Observable<Ao[]> {
    return this.http.get<Ao[]>(`${this.AoNGURL}`, {withCredentials: true});
  }

  getAoNNL(id: string): Observable<any> {
    return this.http.get(`${this.AoNNLURL}/${id}`, {withCredentials: true});
  }

  getAoNNLList(): Observable<Ao[]> {
    return this.http.get<Ao[]>(`${this.AoNNLURL}`, {withCredentials: true});
  }

  getTTNG(id: string): Observable<any> {
    return this.http.get(`${this.TTNGURL}/${id}`, {withCredentials: true});
  }

  getTTNGList(): Observable<TrangTrai[]> {
    return this.http.get<TrangTrai[]>(`${this.TTNGURL}`, {withCredentials: true});
  }

  getTTNNL(id: string): Observable<any> {
    return this.http.get(`${this.TTNNLURL}/${id}`, {withCredentials: true});
  }

  getTTNNLList(): Observable<TrangTrai[]> {
    return this.http.get<TrangTrai[]>(`${this.TTNNLURL}`, {withCredentials: true});
  }

  getPT(id: string): Observable<any> {
    return this.http.get(`${this.PTURL}/${id}`, {withCredentials: true});
  }

  getPTList(): Observable<PhuongTien[]> {
    return this.http.get<PhuongTien[]>(`${this.PTURL}`, {withCredentials: true});
  }

  getNL(id: string): Observable<any> {
    return this.http.get(`${this.NgLURL}/${id}`, {withCredentials: true});
  }

  getNLList(): Observable<NgLieu[]> {
    return this.http.get<NgLieu[]>(`${this.NgLURL}`, {withCredentials: true});
  }

  getCSCB(id: string): Observable<any> {
    return this.http.get(`${this.CSCBURL}/${id}`, {withCredentials: true});
  }

  getCSCBList(): Observable<CoSo[]> {
    return this.http.get<CoSo[]>(`${this.CSCBURL}`, {withCredentials: true});
  }

  getCSPP(id: string): Observable<any> {
    return this.http.get(`${this.CSPPURL}/${id}`, {withCredentials: true});
  }

  getCSPPList(): Observable<CoSo[]> {
    return this.http.get<CoSo[]>(`${this.CSPPURL}`, {withCredentials: true});
  }

  getCSBL(id: string): Observable<any> {
    return this.http.get(`${this.CSBLURL}/${id}`, {withCredentials: true});
  }

  getCSBLList(): Observable<CoSo[]> {
    return this.http.get<CoSo[]>(`${this.CSBLURL}`, {withCredentials: true});
  }

  getSPN(id: string): Observable<any> {
    return this.http.get(`${this.SPNURL}/${id}`, {withCredentials: true});
  }

  getSPNList(): Observable<SanPhamNgoai[]> {
    return this.http.get<SanPhamNgoai[]>(`${this.SPNURL}`, {withCredentials: true});
  }

  getSP(id: string): Observable<any> {
    return this.http.get(`${this.SPURL}/${id}`, {withCredentials: true});
  }

  getSPList(): Observable<SanPhamNoi[]> {
    return this.http.get<SanPhamNoi[]>(`${this.SPURL}`, {withCredentials: true});
  }
}

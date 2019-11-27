import { Component, OnInit } from '@angular/core';
import {AssetsService} from '../service/assets.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TrangTrai} from '../model/trangtrai';
import {CoSo} from '../model/coso';
import {NuoiGiongService} from '../service/nuoigiong.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private id: string;
  ttng: TrangTrai;
  ttngl: TrangTrai;
  cscb: CoSo;
  cspp: CoSo;
  csbl: CoSo;

  constructor(private assetsService: AssetsService,
              private ngService: NuoiGiongService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.assetsService.getSPN(this.id).subscribe(spn => {
      let sp = spn.truyxuatngoai;
      console.log(spn);
      this.assetsService.getTTNG(sp[0]).subscribe(ng => {
        this.ttng = ng;
      });
      this.assetsService.getTTNNL(sp[1]).subscribe(nnl => {
        this.ttngl = nnl;
      });
      this.assetsService.getCSCB(sp[2]).subscribe(cb => {
        this.cscb = cb;
      });
      this.assetsService.getCSPP(sp[3]).subscribe(pp => {
        this.cspp = pp;
      });
      this.assetsService.getCSBL(sp[4]).subscribe(bl => {
        this.csbl = bl;
      });
    })
  }

  direct(number: number) {
    this.assetsService.getSP(this.id).subscribe(prod => {
      let n = prod.truyxuatnoi;
      if (number == 0){
        this.router.navigate(['gd/ng-detail', n[0]]);
      }
      else if (number == 1) {
        this.router.navigate(['gd/ngl-detail', n[1]]);
      }
      else if (number == 2) {
        this.router.navigate(['gd/cb-detail', n[2]]);
      }
      else if (number == 3) {
        this.router.navigate(['gd/pp-detail', n[3]]);
      }
      else {
        this.router.navigate(['gd/bl-detail', n[4]]);
      }
    }, error => {
        console.log(error);
    });
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AssetsService} from '../../../service/assets.service';
import {ChebienService} from '../../../service/chebien.service';
import {MatStepper} from '@angular/material/stepper';
import {Ao} from '../../../model/ao';
import {TrangTrai} from '../../../model/trangtrai';
import {NgLieu} from '../../../model/nglieu';
import {PhuongTien} from '../../../model/phuongtien';
import {CoSo} from '../../../model/coso';
import {CheBien} from '../../../model/chebien';

@Component({
  selector: 'app-chebien-detail',
  templateUrl: './chebien-detail.component.html',
  styleUrls: ['./chebien-detail.component.css']
})
export class ChebienDetailComponent implements OnInit {
  private id: string;
  // @ts-ignore
  @ViewChild('stepper') stepper: MatStepper;
  private cscb: CoSo;
  private nl: NgLieu;
  private pt: PhuongTien;
  private csn: CoSo;
  private chebien: CheBien;
  tgnhannl: string;
  tgxuat: string;
  constructor(private cbService: ChebienService,
              private router: Router,
              private assetsService: AssetsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.stepper.selectedIndex = 6;
    this.cbService.getGDCB(this.id).subscribe(cbn => {
      this.chebien = cbn;
      this.tgnhannl = new Date(this.chebien.tgnhannl).toLocaleDateString('en-GB');
      this.tgxuat = new Date(this.chebien.tgxuat).toLocaleDateString('en-GB');


      let t = cbn.cscb.split('#');
      this.assetsService.getCSCB(t[1]).subscribe(cs => {
        this.cscb = cs;
      });
      let t1 = cbn.cspp.split('#');
      this.assetsService.getCSPP(t1[1]).subscribe(cs => {
        this.csn = cs;
      });
      let nl = cbn.nguyenlieu.split('#');
      this.assetsService.getNL(nl[1]).subscribe(ngl => {
        this.nl = ngl;
      });
      let pt = cbn.phuongtien.split('#');
      this.assetsService.getPT(pt[1]).subscribe(pt1 => {
        this.pt = pt1;
      });
    });
  }

}

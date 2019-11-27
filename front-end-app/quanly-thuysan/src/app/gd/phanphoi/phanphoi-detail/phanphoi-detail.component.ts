import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AssetsService} from '../../../service/assets.service';
import {PhanphoiService} from '../../../service/phanphoi.service';
import {MatStepper} from '@angular/material/stepper';
import {PhanPhoi} from '../../../model/phanphoi';
import {CoSo} from '../../../model/coso';
import {NgLieu} from '../../../model/nglieu';
import {PhuongTien} from '../../../model/phuongtien';

@Component({
  selector: 'app-phanphoi-detail',
  templateUrl: './phanphoi-detail.component.html',
  styleUrls: ['./phanphoi-detail.component.css']
})
export class PhanphoiDetailComponent implements OnInit {
  private id: string;
  // @ts-ignore
  @ViewChild('stepper') stepper: MatStepper;
  private phanphoi: PhanPhoi;
  private cspp: CoSo;
  private csn: CoSo;
  private nl: NgLieu;
  private pt: PhuongTien;
  tgnhan: string;
  tggiao: string;

  constructor(private ppService: PhanphoiService,
              private router: Router,
              private assetsService: AssetsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.stepper.selectedIndex = 6;
    this.ppService.getGDPP(this.id).subscribe(ppn => {
      this.phanphoi = ppn;
      this.tgnhan = new Date(this.phanphoi.tgnhan).toLocaleDateString('en-GB');
      this.tggiao = new Date(this.phanphoi.tggiao).toLocaleDateString('en-GB');


      let t = ppn.cspp.split('#');
      this.assetsService.getCSPP(t[1]).subscribe(cs => {
        this.cspp = cs;
      });
      let t1 = ppn.csbl.split('#');
      this.assetsService.getCSBL(t1[1]).subscribe(cs => {
        this.csn = cs;
      });
      let nl = ppn.nguyenlieu.split('#');
      this.assetsService.getNL(nl[1]).subscribe(ngl => {
        this.nl = ngl;
      });
      let pt = ppn.phuongtien.split('#');
      this.assetsService.getPT(pt[1]).subscribe(pt1 => {
        this.pt = pt1;
      });
    });
  }

}

import {Component, OnInit, ViewChild} from '@angular/core';
import {AssetsService} from '../../../service/assets.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatStepper} from '@angular/material/stepper';
import {NuoiGiongService} from '../../../service/nuoigiong.service';
import {NuoiGiong} from '../../../model/nuoigiong';
import {Ao} from '../../../model/ao';
import {TrangTrai} from '../../../model/trangtrai';
import {NgLieu} from '../../../model/nglieu';
import {PhuongTien} from '../../../model/phuongtien';


@Component({
  selector: 'app-nuoigiong-detail',
  templateUrl: './nuoigiong-detail.component.html',
  styleUrls: ['./nuoigiong-detail.component.css']
})
export class NuoigiongDetailComponent implements OnInit {
  private id: string;
  // @ts-ignore
  @ViewChild('stepper') stepper: MatStepper;
  private nuoigiong: NuoiGiong;
  private ao: Ao;
  private tt: TrangTrai;
  private ttn: TrangTrai;
  private nl: NgLieu;
  private pt: PhuongTien;
  tgnuoi: string;
  tgxuatao: string;

  constructor(private ngService: NuoiGiongService,
              private router: Router,
              private assetsService: AssetsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.stepper.selectedIndex = 6;
    this.ngService.getGDNG(this.id).subscribe(ng => {
      this.nuoigiong = ng;
      this.tgnuoi = new Date(this.nuoigiong.tgnuoi).toLocaleDateString('en-GB');
      this.tgxuatao = new Date(this.nuoigiong.tgxuatao).toLocaleDateString('en-GB');

      let ao = ng.ao.split('#');
      this.assetsService.getAoNG(ao[1]).subscribe(ao => {
        this.ao = ao;
      });
      let tt = ng.trangtrai.split('#');
      this.assetsService.getTTNG(tt[1]).subscribe(trt => {
        this.tt = trt;
      });
      let t = ng.trangtrainhan.split('#');
      this.assetsService.getTTNNL(t[1]).subscribe(trtn => {
        this.ttn = trtn;
      });
      let nl = ng.nguyenlieu.split('#');
      this.assetsService.getNL(nl[1]).subscribe(ngl => {
        this.nl = ngl;
      });
      let pt = ng.phuongtien.split('#');
      this.assetsService.getPT(pt[1]).subscribe(pt1 => {
        this.pt = pt1;
      });
    });
  }
}

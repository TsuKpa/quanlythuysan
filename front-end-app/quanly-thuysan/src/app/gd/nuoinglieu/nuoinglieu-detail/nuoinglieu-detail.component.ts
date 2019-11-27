import {Component, OnInit, ViewChild} from '@angular/core';
import {MatStepper} from '@angular/material/stepper';
import {NuoiGiong} from '../../../model/nuoigiong';
import {Ao} from '../../../model/ao';
import {TrangTrai} from '../../../model/trangtrai';
import {NgLieu} from '../../../model/nglieu';
import {PhuongTien} from '../../../model/phuongtien';
import {ActivatedRoute, Router} from '@angular/router';
import {AssetsService} from '../../../service/assets.service';
import {NuoinlService} from '../../../service/nuoinl.service';
import {CoSo} from '../../../model/coso';
import {NuoiNgLieu} from '../../../model/nuoinl';

@Component({
  selector: 'app-nuoinglieu-detail',
  templateUrl: './nuoinglieu-detail.component.html',
  styleUrls: ['./nuoinglieu-detail.component.css']
})
export class NuoinglieuDetailComponent implements OnInit {
  private id: string;
  // @ts-ignore
  @ViewChild('stepper') stepper: MatStepper;
  private nuoinl: NuoiNgLieu;
  private ao: Ao;
  private tt: TrangTrai;
  private nl: NgLieu;
  private pt: PhuongTien;
  private csn: CoSo;
  tgnhangiong: string;
  tgxuatao: string;

  constructor(private nglService: NuoinlService,
              private router: Router,
              private assetsService: AssetsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.stepper.selectedIndex = 6;
    this.nglService.getGDNNL(this.id).subscribe(nnl => {
      this.nuoinl = nnl;
      this.tgnhangiong = new Date(this.nuoinl.tgnhangiong).toLocaleDateString('en-GB');
      this.tgxuatao = new Date(this.nuoinl.tgxuatao).toLocaleDateString('en-GB');


      let ao = nnl.ao.split('#');
      this.assetsService.getAoNNL(ao[1]).subscribe(ao => {
        this.ao = ao;
      });
      let tt = nnl.trangtrai.split('#');
      this.assetsService.getTTNNL(tt[1]).subscribe(trt => {
        this.tt = trt;
      });
      let t = nnl.cscb.split('#');
      this.assetsService.getCSCB(t[1]).subscribe(cs => {
        this.csn = cs;
      });
      let nl = nnl.nguyenlieu.split('#');
      this.assetsService.getNL(nl[1]).subscribe(ngl => {
        this.nl = ngl;
      });
      let pt = nnl.phuongtien.split('#');
      this.assetsService.getPT(pt[1]).subscribe(pt1 => {
        this.pt = pt1;
      });
    });
  }

}

import {Component, OnInit, ViewChild} from '@angular/core';
import {webSocket} from 'rxjs/webSocket';
import {NuoiGiong} from '../../model/nuoigiong';
import {NuoiGiongService} from '../../service/nuoigiong.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AssetsService} from '../../service/assets.service';
import {Ao} from '../../model/ao';
import {PhuongTien} from '../../model/phuongtien';
import {TrangTrai} from '../../model/trangtrai';
import {NgLieu} from '../../model/nglieu';
import {MatStepper} from '@angular/material/stepper';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-nuoigiong',
  templateUrl: './nuoigiong.component.html',
  styleUrls: ['./nuoigiong.component.css']
})
export class NuoigiongComponent implements OnInit {
  ng: NuoiGiong = new NuoiGiong();
  private submitted: false;
  ao: Ao[];
  pt: PhuongTien[];
  tt: TrangTrai[];
  nl: NgLieu;
  private idNG: string;
  private id: string;
  // @ts-ignore
  @ViewChild('stepper') stepper: MatStepper;
  isLoading: false;

  constructor(private ngService: NuoiGiongService,
              private router: Router, private loginS: LoginService,
              private assetsService: AssetsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.idNG = this.id + 'ng';

    //stepper
    this.stepper.selectedIndex = 0;
    var a1 = [];
    this.loginS.isLoggedIn().subscribe(profile => {
      this.ngService.getTTNG(profile['participant'].split('#')[1]).subscribe(ttng => {
        this.assetsService.getTTNG((ttng.tt).split('#')[1]).subscribe(tt => {
          for (let a of tt.ao){
            this.assetsService.getAoNG(a).subscribe(aoNG => {
              a1.push(aoNG);
              //console.log(a1);
            });
          }
          this.ao = a1;
        });
        }
      );
    });


    this.assetsService.getTTNNLList().subscribe(tt => {
      this.tt = tt;
    });

    this.assetsService.getSP(this.id).subscribe(nl => {
      this.ng.nguyenlieu = nl.nguyenlieu;
      let n = nl.nguyenlieu.split('#');
      this.assetsService.getNL(n[1]).subscribe(ngl => {
        this.nl = ngl;
      });
    });

    this.assetsService.getPTList().subscribe(pt => {
      this.pt = pt;
    });

  }

  save() {
    // @ts-ignore
    this.isLoading = true;
    this.ngService.createGDNG(this.ng)
      .subscribe(data => {
        this.gotoList();
      }, error => console.log(error));
  }

  gotoList() {
    this.router.navigate(['/product']);
  }

  onSubmit() {
    this.ng.$class = 'org.hlfc.qlts.TaoGiaiDoanNuoiGiong';
    this.ng.sanphamngoai = 'resource:org.hlfc.qlts.SanPhamNgoai#'+ this.id;
    this.ng.sanphamnoi = 'resource:org.hlfc.qlts.SanPhamNoi#'+ this.id;
    this.ng.idgdng = this.idNG;
    this.ng.ao = 'resource:org.hlfc.qlts.AoNG#'+ this.ng.ao;
    this.ng.trangtrainhan = 'resource:org.hlfc.qlts.TrangTraiNNL#'+ this.ng.trangtrainhan;
    this.ng.phuongtien = 'resource:org.hlfc.qlts.PhuongTien#'+ this.ng.phuongtien;
    this.loginS.isLoggedIn().subscribe(owner => {
      this.ng.trangtrainuoigiong = 'resource:'+owner['participant'];
      this.ngService.getTTNG(owner['participant'].split('#')[1]).subscribe(ttng =>{
        this.ng.trangtrai = ttng.tt;
        this.save();
      });
    });
    console.log(this.ng);
    //this.ng.trangtrainuoigiong = 'resource:org.hlfc.qlts.TrangTraiNuoiGiong#trangtrainuoigiong1';
    // @ts-ignore
    this.submitted = true;
  }



}

import {Component, OnInit, ViewChild} from '@angular/core';
import {webSocket} from 'rxjs/webSocket';
import {ActivatedRoute, Router} from '@angular/router';
import {AssetsService} from '../../service/assets.service';
import {Ao} from '../../model/ao';
import {PhuongTien} from '../../model/phuongtien';
import {NgLieu} from '../../model/nglieu';
import {MatStepper} from '@angular/material/stepper';
import {NuoiNgLieu} from '../../model/nuoinl';
import {NuoinlService} from '../../service/nuoinl.service';
import {CoSo} from '../../model/coso';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-nuoinglieu',
  templateUrl: './nuoinglieu.component.html',
  styleUrls: ['./nuoinglieu.component.css']
})
export class NuoinglieuComponent implements OnInit {

  nnl: NuoiNgLieu = new NuoiNgLieu();
  private submitted: false;
  ao: Ao[];
  pt: PhuongTien[];
  nl: NgLieu;
  private idNG: string;
  private id: string;
  // @ts-ignore
  @ViewChild('stepper') stepper: MatStepper;
  private cs: CoSo[];
  isLoading: false;

  constructor(private nlService: NuoinlService,
              private router: Router, private loginS: LoginService,
              private assetsService: AssetsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.idNG = this.id + 'nnl';
    //stepper
    this.stepper.selectedIndex = 1;

    var a1 = [];
    this.loginS.isLoggedIn().subscribe(profile => {
      this.nlService.getTTNNL(profile['participant'].split('#')[1]).subscribe(ttnnl => {
          this.assetsService.getTTNNL((ttnnl.tt).split('#')[1]).subscribe(tt => {
            for (let a of tt.ao){
              this.assetsService.getAoNNL(a).subscribe(aoNNL => {
                a1.push(aoNNL);
                //console.log(a1);
              });
            }
            this.ao = a1;
          });
        }
      );
    });


    this.assetsService.getAoNNLList().subscribe(ao => {
      this.ao = ao;
    });

    this.assetsService.getSP(this.id).subscribe(nl => {
      this.nnl.nguyenlieu = nl.nguyenlieu;
      let n = nl.nguyenlieu.split('#');
      this.assetsService.getNL(n[1]).subscribe(ngl => {
        this.nl = ngl;
      });
    });

    this.assetsService.getCSCBList().subscribe(cs => {
      this.cs = cs;
    });

    this.assetsService.getPTList().subscribe(pt => {
      this.pt = pt;
    });
  }

  save() {
    // @ts-ignore
    this.isLoading = true;
    this.nlService.createGDNNL(this.nnl)
      .subscribe(data => {
        this.gotoList();
      }, error => console.log(error));
  }

  gotoList() {
    this.router.navigate(['/product']);
  }

  onSubmit() {
    this.nnl.$class = 'org.hlfc.qlts.TaoGiaiDoanNuoiNguyenLieu';
    this.nnl.sanphamngoai = 'resource:org.hlfc.qlts.SanPhamNgoai#'+ this.id;
    this.nnl.sanphamnoi = 'resource:org.hlfc.qlts.SanPhamNoi#'+ this.id;
    this.nnl.idgdnnl = this.idNG;
    this.nnl.ao = 'resource:org.hlfc.qlts.AoNNL#'+ this.nnl.ao;
    this.nnl.cscb = 'resource:org.hlfc.qlts.CoSoCB#'+ this.nnl.cscb; //diem den
    this.nnl.phuongtien = 'resource:org.hlfc.qlts.PhuongTien#'+ this.nnl.phuongtien;
    this.loginS.isLoggedIn().subscribe(owner => {
      this.nnl.trangtrainuoinguyenlieu = 'resource:'+owner['participant'];
      this.nlService.getTTNNL(owner['participant'].split('#')[1]).subscribe(ttng =>{
        this.nnl.trangtrai = ttng.tt;
        this.save();
      });
    });
    //this.nnl.trangtrainuoinguyenlieu = 'resource:org.hlfc.qlts.TrangTraiNuoiNguyenLieu#trangtrainguyenlieu1';
    // @ts-ignore
    this.submitted = true;
  }
}

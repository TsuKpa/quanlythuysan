import {Component, OnInit, ViewChild} from '@angular/core';
import {MatStepper} from '@angular/material/stepper';
import {ActivatedRoute, Router} from '@angular/router';
import {AssetsService} from '../../service/assets.service';
import {NgLieu} from '../../model/nglieu';
import {PhuongTien} from '../../model/phuongtien';
import {CoSo} from '../../model/coso';
import {PhanPhoi} from '../../model/phanphoi';
import {PhanphoiService} from '../../service/phanphoi.service';
import {LoginService} from '../../login/login.service';



@Component({
  selector: 'app-phanphoi',
  templateUrl: './phanphoi.component.html',
  styleUrls: ['./phanphoi.component.css']
})
export class PhanphoiComponent implements OnInit {

  private idNG: string;
  submitted: false;
  phanphoi: PhanPhoi = new PhanPhoi();
  nl: NgLieu;
  pt: PhuongTien[];
  // @ts-ignore
  @ViewChild('stepper') stepper: MatStepper;
  isLoading: false;
  private id: string;
  private cs: CoSo[];

  constructor(private ppService: PhanphoiService,
              private router: Router,  private loginS: LoginService,
              private assetsService: AssetsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.idNG = this.id + 'pp';
    //stepper
    this.stepper.selectedIndex = 3;

    this.assetsService.getSP(this.id).subscribe(nl => {
      this.phanphoi.nguyenlieu = nl.nguyenlieu;
      let n = nl.nguyenlieu.split('#');
      this.assetsService.getNL(n[1]).subscribe(ngl => {
        this.nl = ngl;
      });
    });
    this.assetsService.getPTList().subscribe(pt => {
      this.pt = pt;
    });
    this.assetsService.getCSBLList().subscribe(cs => {
      this.cs = cs;
    });
  }
  gotoList() {
    this.router.navigate(['/product']);
  }

  save() {
    // @ts-ignore
    this.isLoading = true;
    this.ppService.createGDPP(this.phanphoi)
      .subscribe(data => {
        this.gotoList();
      }, error => console.log(error));
  }


  onSubmit() {
    this.phanphoi.$class = 'org.hlfc.qlts.TaoGiaiDoanPhanPhoi';
    this.phanphoi.sanphamngoai = 'resource:org.hlfc.qlts.SanPhamNgoai#'+ this.id;
    this.phanphoi.sanphamnoi = 'resource:org.hlfc.qlts.SanPhamNoi#'+ this.id;
    this.phanphoi.idgdpp = this.idNG;
    this.phanphoi.masanpham = this.id;
    this.phanphoi.csbl = 'resource:org.hlfc.qlts.CoSoBL#'+ this.phanphoi.csbl; //diem di
    this.phanphoi.phuongtien = 'resource:org.hlfc.qlts.PhuongTien#'+ this.phanphoi.phuongtien;
    this.loginS.isLoggedIn().subscribe(owner => {
      this.phanphoi.nhaphanphoi = 'resource:'+owner['participant'];
      this.ppService.getNPP(owner['participant'].split('#')[1]).subscribe(npp =>{
        //console.log(npp);
        this.phanphoi.cspp = npp.cspp;
        this.save();
      });
    });
    //this.phanphoi.nhaphanphoi = 'resource:org.hlfc.qlts.NhaPhanPhoi#phanphoi1';

    // @ts-ignore
    this.submitted = true;
  }
}

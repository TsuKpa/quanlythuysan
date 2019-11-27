import {Component, OnInit, ViewChild} from '@angular/core';
import {CheBien} from '../../model/chebien';
import {MatStepper} from '@angular/material/stepper';
import {ActivatedRoute, Router} from '@angular/router';
import {AssetsService} from '../../service/assets.service';
import {ChebienService} from '../../service/chebien.service';
import {NgLieu} from '../../model/nglieu';
import {PhuongTien} from '../../model/phuongtien';
import {CoSo} from '../../model/coso';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-chebien',
  templateUrl: './chebien.component.html',
  styleUrls: ['./chebien.component.css']
})
export class ChebienComponent implements OnInit {
  private idNG: string;
  submitted: false;
  chebien: CheBien = new CheBien();
  nl: NgLieu;
  pt: PhuongTien[];
  // @ts-ignore
  @ViewChild('stepper') stepper: MatStepper;
  isLoading: false;
  private id: string;
  private cs: CoSo[];

  constructor(private cbService: ChebienService,
              private router: Router, private loginS: LoginService,
              private assetsService: AssetsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.idNG = this.id + 'cb';
    //stepper
    this.stepper.selectedIndex = 2;

    this.assetsService.getSP(this.id).subscribe(nl => {
      this.chebien.nguyenlieu = nl.nguyenlieu;
      let n = nl.nguyenlieu.split('#');
      this.assetsService.getNL(n[1]).subscribe(ngl => {
        this.nl = ngl;
      });
    });
    this.assetsService.getPTList().subscribe(pt => {
      this.pt = pt;
    });
    this.assetsService.getCSPPList().subscribe(cs => {
      this.cs = cs;
    });
  }

  gotoList() {
    this.router.navigate(['/product']);
  }

  save() {
    // @ts-ignore
    this.isLoading = true;
    this.cbService.createGDCB(this.chebien)
      .subscribe(data => {
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.chebien.$class = 'org.hlfc.qlts.TaoGiaiDoanCheBien';
    this.chebien.sanphamngoai = 'resource:org.hlfc.qlts.SanPhamNgoai#'+ this.id;
    this.chebien.sanphamnoi = 'resource:org.hlfc.qlts.SanPhamNoi#'+ this.id;
    this.chebien.idgdcb = this.idNG;
    this.chebien.masanpham = this.id;
    this.chebien.cspp = 'resource:org.hlfc.qlts.CoSoPP#'+ this.chebien.cspp; //diem di
    this.chebien.phuongtien = 'resource:org.hlfc.qlts.PhuongTien#'+ this.chebien.phuongtien;
    this.loginS.isLoggedIn().subscribe(owner => {
      this.chebien.nhachebien = 'resource:'+owner['participant'];
      this.cbService.getNCB(owner['participant'].split('#')[1]).subscribe(ncb =>{
        //console.log(ncb);
        this.chebien.cscb = ncb.cscb;
        this.save();
      });

    });
    //this.chebien.nhachebien = 'resource:org.hlfc.qlts.NhaCheBien#chebien1';

    // @ts-ignore
    this.submitted = true;
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {MatStepper} from '@angular/material/stepper';
import {ActivatedRoute, Router} from '@angular/router';
import {AssetsService} from '../../service/assets.service';
import {NgLieu} from '../../model/nglieu';
import {PhuongTien} from '../../model/phuongtien';
import {BanLe} from '../../model/banle';
import {BanleService} from '../../service/banle.service';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-banle',
  templateUrl: './banle.component.html',
  styleUrls: ['./banle.component.css']
})
export class BanleComponent implements OnInit {
  private idNG: string;
  submitted: false;
  banle: BanLe = new BanLe();
  nl: NgLieu;
  pt: PhuongTien[];
  // @ts-ignore
  @ViewChild('stepper') stepper: MatStepper;
  isLoading: false;
  private id: string;
  constructor(private blService: BanleService,
              private router: Router, private loginS: LoginService,
              private assetsService: AssetsService,
              private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.idNG = this.id + 'bl';
    //stepper
    this.stepper.selectedIndex = 4;

    this.assetsService.getSP(this.id).subscribe(nl => {
      this.banle.nguyenlieu = nl.nguyenlieu;
      let n = nl.nguyenlieu.split('#');
      this.assetsService.getNL(n[1]).subscribe(ngl => {
        this.nl = ngl;
      });
    });
  }
  gotoList() {
    this.router.navigate(['/product']);
  }

  save() {
    // @ts-ignore
    this.isLoading = true;
    this.blService.createGDBL(this.banle)
      .subscribe(data => {
        this.gotoList();
      }, error => console.log(error));
  }


  onSubmit() {
    this.banle.$class = 'org.hlfc.qlts.TaoGiaiDoanBanLe';
    this.banle.sanphamngoai = 'resource:org.hlfc.qlts.SanPhamNgoai#'+ this.id;
    this.banle.sanphamnoi = 'resource:org.hlfc.qlts.SanPhamNoi#'+ this.id;
    this.banle.idgdbl = this.idNG;
    this.banle.masanpham = this.id;
    this.loginS.isLoggedIn().subscribe(owner => {
      this.banle.nhabanle = 'resource:'+owner['participant'];
      this.blService.getNBL(owner['participant'].split('#')[1]).subscribe(nbl =>{
        //console.log(nbl);
        this.banle.csbl = nbl.csbl;
        this.save();
      });
    });
    //this.banle.nhabanle = 'resource:org.hlfc.qlts.NhaBanLe#banle1';
    // @ts-ignore
    this.submitted = true;
  }
}

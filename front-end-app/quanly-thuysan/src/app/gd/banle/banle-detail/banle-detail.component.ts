import {Component, OnInit, ViewChild} from '@angular/core';
import {MatStepper} from '@angular/material/stepper';
import {ActivatedRoute, Router} from '@angular/router';
import {AssetsService} from '../../../service/assets.service';
import {BanleService} from '../../../service/banle.service';
import {NgLieu} from '../../../model/nglieu';
import {BanLe} from '../../../model/banle';
import {CoSo} from '../../../model/coso';
import {PhuongTien} from '../../../model/phuongtien';

@Component({
  selector: 'app-banle-detail',
  templateUrl: './banle-detail.component.html',
  styleUrls: ['./banle-detail.component.css']
})
export class BanleDetailComponent implements OnInit {
  private id: string;
  // @ts-ignore
  @ViewChild('stepper') stepper: MatStepper;
  private nl: NgLieu;
  private banle: BanLe;
  private csbl: CoSo;
  private pt: PhuongTien;
  private tgnhan: string;

  constructor(private blService: BanleService,
              private router: Router,
              private assetsService: AssetsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.stepper.selectedIndex = 6;
    this.blService.getGDBL(this.id).subscribe(bln => {
      this.banle = bln;
      this.tgnhan = new Date(this.banle.tgnhan).toLocaleDateString('en-GB');

      let t = bln.csbl.split('#');
      this.assetsService.getCSBL(t[1]).subscribe(cs => {
        this.csbl = cs;
      });

      let nl = bln.nguyenlieu.split('#');
      this.assetsService.getNL(nl[1]).subscribe(ngl => {
        this.nl = ngl;
      });
    });
  }

}

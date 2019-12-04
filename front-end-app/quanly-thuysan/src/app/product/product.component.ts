import {Component, Inject, OnInit} from '@angular/core';
import {SanPhamNgoai} from '../model/sanphamngoai';
import {AssetsService} from '../service/assets.service';
import {Router} from '@angular/router';
import {LoginService} from '../login/login.service';
import {HttpClient} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private spns: SanPhamNgoai[];
  status: string;
  productName: string;
  hoantat: any;
  giaidoan_nuoigiong: any;
  myWebSocket: WebSocketSubject<string> = webSocket('ws://192.168.184.158:3000');


  p: number = 1;

  constructor(private router: Router, private loginS: LoginService,
              private http: HttpClient, public dialog: MatDialog,
              private assetsService: AssetsService) {
  }

  ngOnInit() {
    this.assetsService.getSPNList().subscribe(spns => {
      this.spns = spns;
    });

    this.myWebSocket.asObservable().subscribe(dataFromServer => {
      this.assetsService.getSPN(dataFromServer['sanpham'].split('#')[1]).subscribe(spnew => {
        if (dataFromServer['$class'] !== 'org.hlfc.qlts.TaoSanPhamEvent') {
          this.spns.forEach((i) => {
            if (i['idSP'] == dataFromServer['sanpham'].split('#')[1]) {
              this.spns.splice(this.spns.indexOf(i), 1);
              this.spns.push(spnew);
            }
          });
        } else {
          this.spns.push(spnew);
        }
      });
      //console.log(this.spns);
      //console.log(dataFromServer);
    });

  }

  direct(idSP: string, status: string) {
    // tslint:disable-next-line:triple-equals
    if (status == 'hoantat') {
      this.router.navigate(['product-detail', idSP]);
      // tslint:disable-next-line:triple-equals
    } else if (status == 'giaidoan_nuoigiong') {
      this.loginS.isLoggedIn().subscribe(data => {
        this.assetsService.getSP(idSP).subscribe(spnoi => {
          var owner = spnoi['ttng'].split(':');
          if (data['participant'] == owner[1]) {
            this.router.navigate(['gd/ng', idSP]);
          } else {
            const dialogRef = this.dialog.open(NoticeDialog, {
              width: '250px',
              data: {title: 'Bạn không được phép tham gia vào sản phẩm này, Nếu đây là lỗi vui lòng liên hệ admin!'}
            });
          }
        });
      }, error => {
        console.log(error);
        if (error.status == 401) {
          this.router.navigate(['/login']);
        } else if (error.error.error.message === 'A business network card has not been specified'){
          const dialogRef = this.dialog.open(NoticeDialog, {
            width: '250px',
            data: {title: 'Vui lòng đăng nhập để thêm thông tin!'}
          });
          dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(['/login']);
          });
        }
      });
    } else if (status == 'giaidoan_nuoinguyenlieu') {
      this.loginS.isLoggedIn().subscribe(data => {
        this.assetsService.getSP(idSP).subscribe(spnoi => {
          var owner = spnoi['ttnnl'].split(':');
          if (data['participant'] == owner[1]) {
            this.router.navigate(['gd/ngl', idSP]);
          } else {
            const dialogRef = this.dialog.open(NoticeDialog, {
              width: '250px',
              data: {title: 'Bạn không được phép tham gia vào sản phẩm này, Nếu đây là lỗi vui lòng liên hệ admin!'}
            });
          }
        });
      }, error => {
        if (error.status == 401) {
          this.router.navigate(['/login']);
        } else if (error.error.error.message === 'A business network card has not been specified'){
          const dialogRef = this.dialog.open(NoticeDialog, {
            width: '250px',
            data: {title: 'Vui lòng đăng nhập để thêm thông tin!'}
          });
          dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(['/login']);
          });
        }
      });
    } else if (status == 'giaidoan_chebien') {
      this.loginS.isLoggedIn().subscribe(data => {
        this.assetsService.getSP(idSP).subscribe(spnoi => {
          var owner = spnoi['ncb'].split(':');
          if (data['participant'] == owner[1]) {
            this.router.navigate(['gd/cb', idSP]);
          } else {
            const dialogRef = this.dialog.open(NoticeDialog, {
              width: '250px',
              data: {title: 'Bạn không được phép tham gia vào sản phẩm này, Nếu đây là lỗi vui lòng liên hệ admin!'}
            });
          }
        });
      }, error => {
        if (error.status == 401) {
          this.router.navigate(['/login']);
        }else if (error.error.error.message === 'A business network card has not been specified'){
          const dialogRef = this.dialog.open(NoticeDialog, {
            width: '250px',
            data: {title: 'Vui lòng đăng nhập để thêm thông tin!'}
          });
          dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(['/login']);
          });
        }
      });
    } else if (status == 'giaidoan_phanphoi') {
      this.loginS.isLoggedIn().subscribe(data => {
        this.assetsService.getSP(idSP).subscribe(spnoi => {
          var owner = spnoi['npp'].split(':');
          if (data['participant'] == owner[1]) {
            this.router.navigate(['gd/pp', idSP]);
          } else {
            const dialogRef = this.dialog.open(NoticeDialog, {
              width: '250px',
              data: {title: 'Bạn không được phép tham gia vào sản phẩm này, Nếu đây là lỗi vui lòng liên hệ admin!'}
            });
          }
        });
      }, error => {
        if (error.status == 401) {
          this.router.navigate(['/login']);
        }else if (error.error.error.message === 'A business network card has not been specified'){
          const dialogRef = this.dialog.open(NoticeDialog, {
            width: '250px',
            data: {title: 'Vui lòng đăng nhập để thêm thông tin!'}
          });
          dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(['/login']);
          });
        }
      });
    } else if (status == 'giaidoan_banle') {
      this.loginS.isLoggedIn().subscribe(data => {
        this.assetsService.getSP(idSP).subscribe(spnoi => {
          var owner = spnoi['nbl'].split(':');
          if (data['participant'] == owner[1]) {
            this.router.navigate(['gd/bl', idSP]);
          } else {
            const dialogRef = this.dialog.open(NoticeDialog, {
              width: '250px',
              data: {title: 'Bạn không được phép tham gia vào sản phẩm này, Nếu đây là lỗi vui lòng liên hệ admin!'}
            });
          }
        });
      }, error => {
        if (error.status == 401) {
          this.router.navigate(['/login']);
        }else if (error.error.error.message === 'A business network card has not been specified'){
          const dialogRef = this.dialog.open(NoticeDialog, {
            width: '250px',
            data: {title: 'Vui lòng đăng nhập để thêm thông tin!'}
          });
          dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(['/login']);
          });
        }
      });
    }
  }

  onSubmit() {
    if (this.productName != null && this.productName != '') {
      this.assetsService.getSPN(this.productName.toLowerCase()).subscribe(s => {
        this.spns = [];
        this.spns.push(s);
      }, error => {
        //console.log(error);
      if (error.status == 404){
          const dialogRef = this.dialog.open(NoticeDialog, {
            width: '250px',
            data: {title: 'Không tìm thấy sản phẩm vui lòng kiểm tra lại!'}
          });
        }

      });
    }
  }

}


@Component({
  selector: 'notice-dialog',
  templateUrl: 'notice-dialog.html',
})
export class NoticeDialog {

  constructor(
    public dialogRef: MatDialogRef<NoticeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  logout: string;
  title: string;
}

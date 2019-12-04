import {Component, Inject} from '@angular/core';
import {LoginService} from './login/login.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthGuardService} from './auth-guard.service';
import {NoticeDialog} from './product/product.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quanly-thuysan';
  private pingURL = 'https://192.168.184.158:3000/api/system/ping';

  constructor(private auth: LoginService, private router: Router,
              private aut: AuthGuardService, public dialog: MatDialog,
              private http: HttpClient) {
  }

  logout() {

    const dialogRef = this.dialog.open(LogoutDialog, {
      width: '250px',
      data: {title: 'ok'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined){
        this.auth.isLoggedIn().subscribe(data => {
          //console.log(data);
          var cardName = data['participant'].split('#')[1]+'.card';
          if (data) {
            this.auth.checkWallet().then(res => {
              //console.log(res);
              this.auth.exportCard(res[0].name).then(card => {
                //console.log(card);
                FileSaver.saveAs(card, cardName);
                this.auth.deleteCard(res[0].name).then((r) => {
                  //console.log(r);
                  this.router.navigate(['/login']);
                }).catch(error => {
                  console.log(error);
                });
              });
            });
          }
        }, error => {
          console.log(error);
          this.router.navigate(['/login']);
        });
      }
    });
  }

  profile() {
    this.auth.isLoggedIn()
      .subscribe(data => {
        console.log(data);
        var a = data['participant'].split('#');
        this.router.navigate(['profile', a[1]]);
      }, error => {
        const dialogRef = this.dialog.open(NoticeDialog, {
          width: '250px',
          data: {title: 'Vui lòng đăng nhập!'}
        });
        dialogRef.afterClosed().subscribe(result => {
          this.router.navigate(['/login']);
        });

      });
  }


  myFunction() {
    var x = document.getElementById('myTopnav');
    if (x.className === 'header') {
      x.className += ' responsive';
    } else {
      x.className = 'header';
    }
  }
}

@Component({
  selector: 'notice-dialog',
  templateUrl: 'notice-dialog.html',
})
export class NoticeDialog1 {

  constructor(
    public dialogRef: MatDialogRef<NoticeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


export interface DialogData {
  title: string;
}


@Component({
  selector: 'logout-dialog',
  templateUrl: 'logout-dialog.html',
})

export class LogoutDialog {

  constructor(
    public dialogRef: MatDialogRef<NoticeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

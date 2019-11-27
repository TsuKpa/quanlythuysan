import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TrangTrai} from '../model/trangtrai';
import {Ao} from '../model/ao';
import {AssetsService} from '../service/assets.service';
import {CoSo} from '../model/coso';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  getURL: string;
  private profile: Object;
  tt: TrangTrai;
  ao: Ao[];
  cs: CoSo;

  constructor(private auth: LoginService, private router: Router,
              private route: ActivatedRoute, private ass: AssetsService,
              private http: HttpClient) {
  }

  ngOnInit() {
    var id = this.route.snapshot.params['id'];
    this.auth.isLoggedIn().subscribe(data => {
      console.log(data);
      var a = data['participant'].split('#');
      this.getURL = a[0];
      console.log(this.getURL);
      this.http.get(`http://192.168.184.158:3000/api/${this.getURL}/${id}`,
        {withCredentials: true}).subscribe(profile => {
        this.profile = profile;
        console.log(profile);
        if (profile['tt']!=undefined) {
          var idTT = profile['tt'].split(':')[1].replace("#","/");
          console.log(idTT);
          this.http.get(`http://192.168.184.158:3000/api/${idTT}`, {withCredentials: true}).subscribe(tt => {
            // @ts-ignore
            this.tt = tt;
            console.log(tt);
          });
        }
        if (profile['cscb']!=undefined) {
          var idCS = profile['cscb'].split(':')[1].replace("#","/");
          this.http.get(`http://192.168.184.158:3000/api/${idCS}`, {withCredentials: true}).subscribe(cs => {
            // @ts-ignore
            this.cs = cs;
            console.log(cs);
          });
        }
        if (profile['cspp']!=undefined) {
          var idCS = profile['cspp'].split(':')[1].replace("#","/");
          this.http.get(`http://192.168.184.158:3000/api/${idCS}`, {withCredentials: true}).subscribe(cs => {
            // @ts-ignore
            this.cs = cs;
            console.log(cs);
          });
        }
        if (profile['csbl']!=undefined) {
          var idCS = profile['csbl'].split(':')[1].replace("#","/");
          this.http.get(`http://192.168.184.158:3000/api/${idCS}`, {withCredentials: true}).subscribe(cs => {
            // @ts-ignore
            this.cs = cs;
            console.log(cs);
          });
        }


      });
    });


  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

// tslint:disable-next-line:max-line-length
const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3MGNiNWZlMC1iMGI3LTAxMzYtNjI3Yi0wOTFiMTE0NmZkN2MiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTM5Mzk1MDY2LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii02NWEyZjVmMi01N2U5LTQyNzctYWYzNi1hN2Y4YTFiMWY3MTUifQ.OSW4qwjNw4sxLZw7-i6k1VKUs7VFB_HVZ6F0aj54p0c';
const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + apiKey,
    'Accept': 'application/vnd.api+json',
  })
};
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  persons: any[];
  matches: any;
  matchesReturn: any = [];
  singleMatch: any;
  count = 0;
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }
  playerPath = 'https://api.pubg.com/shards/pc-eu/players?filter[playerNames]=Heldr0vf';
  matchPath = 'https://api.pubg.com/shards/pc-eu/matches/';
  dtTriggerTrig(x: number, y: number) {
    if (x === y) {
      this.dtTrigger.next();
    }
  }
  ngOnInit() {
    this.dtOptions = {
      searching: false,
      order: [[4, 'desc']]
    };
    this.activatedRoute.params.subscribe(params => {
      const matchID = params['matchID'];
      const dynamicMatchPath = this.matchPath + matchID;
      this.http.get(dynamicMatchPath, httpOptions).subscribe(matchDetail => {
        this.singleMatch = matchDetail;
      });
    });
    this.http.get(this.playerPath, httpOptions).subscribe(playerDetail => {
      this.matches = playerDetail['data'][0].relationships.matches.data;
      for (const match of this.matches) {
        const matchID = match.id;
        const dynamicMatchPath = this.matchPath + matchID;
        this.http.get(dynamicMatchPath, httpOptions).subscribe(
          matchDetail => {
            this.count++;
            this.matchesReturn.push(matchDetail);
            this.dtTriggerTrig(this.count, this.matches.length);
          }, error => {
            this.count++;
            this.dtTriggerTrig(this.count, this.matches.length);
          });
      }
    });
  }
  showMatch(matchID: string) {
    alert(matchID);
  }
  calculatePoint(place, kills, damage, totalPlayer) {
    totalPlayer = totalPlayer / 2;
    const placePoint = (totalPlayer - place + 1) * (totalPlayer / 10);
    const killX = ((totalPlayer) * (totalPlayer / 10)) / 20;
    const killPoint = killX * kills;
    const damagePoint = damage / 200;
    return placePoint + killPoint + damagePoint;
  }
}

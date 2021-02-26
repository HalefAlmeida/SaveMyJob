import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  logged: boolean

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.getUserData.subscribe(user => {
      this.logged = !!user
    })
  }

  logout() {
    this.auth.logout()
  }

}

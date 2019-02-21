import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription, Observable, from } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})

export class SidenavListComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isAuth$ = this.store.pipe(select(fromRoot.getIsAuth));
  }

  onCloseSideNav() {
    this.closeSideNav.emit();
  }

  onLogout(){
    this.onCloseSideNav();
    this.authService.logout();
  }

}

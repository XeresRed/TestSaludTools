import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from '../../../redux/app.reducers';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private show: boolean = true;


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {}

  ToogleMenu() {
    this.store.dispatch(actions.toogleToolbarAction({ payload: !this.show }));
    this.show = !this.show;
  }

}

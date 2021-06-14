import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../redux/app.reducers';
import * as actions from '../../../redux/actions';
import { Menu } from '../../../models/ui/menu.model';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() menu: Menu[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  logOut() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Menu } from 'src/models/ui/menu.model';
import { AppState } from '../../../redux/app.reducers';
import * as selectors from '../../../redux/selectors';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  menu: Menu[] = [
    {
      icon: 'fas fa-globe-americas',
      name: 'Inicio',
      url: '/citas'
    },
    {
      icon: 'far fa-newspaper',
      name: 'Crear Nueva Cita',
      url: '/citas/crear'
    }
  ]

  showToolbar$: Observable<boolean> = of(true)

  constructor(private store: Store<AppState>) {
    this.showToolbar$ = this.store.select(selectors.GetSidebarStatus);
  }

  ngOnInit(): void {
  }

}

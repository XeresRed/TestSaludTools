import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/redux/app.reducers';
import { Observable, of } from 'rxjs';
import { Cita } from 'src/models/negocio/cita.model';
import * as actions from '../../../../redux/actions';
import * as selectors from '../../../../redux/selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  lastCitas$: Observable<Cita[]> = of([])
  citas$: Observable<{citas: Cita[], pages: number, total: number}> = of({citas: [], pages: 1, total: 0})
  page: number = 1
  textSearch = false

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(actions.LoadingAllCitas({page: this.page}));
    this.citas$ = this.store.select(selectors.GetAllCitas)

  }

  search(value: any) {
    const textSearch = value.value
    if (textSearch && textSearch !== undefined && textSearch !== '') {
      this.textSearch = true;
      this.store.dispatch(actions.LoadingSearchCitas({value: value.value}));
    } else {
      this.textSearch = false;
      this.store.dispatch(actions.LoadingAllCitas({page: this.page}));
    }
  }

}

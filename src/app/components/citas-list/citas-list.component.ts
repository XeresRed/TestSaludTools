import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Cita } from '../../../models/negocio/cita.model';
import { AppState } from '../../../redux/app.reducers';
import * as actions from '../../../redux/actions';

@Component({
  selector: 'app-citas-list',
  templateUrl: './citas-list.component.html',
  styleUrls: ['./citas-list.component.scss']
})
export class CitasListComponent implements OnInit {

  @Input() citas: Cita[] | null = []
  @Input() pages =  1;
  @Input() textSearch = false
  @Output() pageEmit: EventEmitter<number> = new EventEmitter();

  page = 1
  pagesArray: number[];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.pagesArray = [ ...Array(this.pages).keys() ].map( i => i+1);
  }

  changePage(event: number) {
    if (this.page <= this.pages || this.page >= this.pages) {
      if (this.page === this.pages) this.page -= 1;
      else if (this.page === 1) this.page += 1;
      else this.page = this.page + event;

      this.store.dispatch(actions.LoadingAllCitas({page: this.page}))
    }
  }

  goToPage(page: number) {
    this.page = page;
    this.store.dispatch(actions.LoadingAllCitas({page}))
  }

}

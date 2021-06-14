import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Cita } from 'src/models/negocio/cita.model';
import { AppState } from 'src/redux/app.reducers';
import * as actions from '../../../../redux/actions';
import * as selectors from '../../../../redux/selectors';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  idCita: number;
  loading$:  Observable<boolean> = of(true)
  cita$: Observable<Cita> = of(null)

  constructor(private activateRouter: ActivatedRoute, private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.idCita = this.activateRouter.snapshot.params['id']
    this.store.dispatch(actions.LoadingCitaDetail({id: this.idCita}))
    this.loading$ = this.store.select(selectors.GetLoadingCita)
    this.cita$ = this.store.select(selectors.GetCitasDetail)
  }

  goBack() {
    this.router.navigateByUrl('/citas')
  }

  changeStatus(cita: Cita) {
    const changeCita: Cita = {...cita, Activa: !cita.Activa}
    this.store.dispatch(actions.LoadingUpdateCita({cita: changeCita}))
  }

  edit(id: number) {
    this.router.navigate(['/citas', 'actualizar', id ])
  }

}

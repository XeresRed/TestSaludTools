import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/redux/app.reducers';
import { Cita } from '../../../../models/negocio/cita.model';
import * as actions from '../../../../redux/actions';
import * as selectors from '../../../../redux/selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-cita',
  templateUrl: './create-cita.component.html',
  styleUrls: ['./create-cita.component.scss']
})
export class CreateCitaComponent implements OnInit {

  citaGroup: FormGroup;
  update = false;
  citaUpdate: Cita;

  constructor(private store: Store<AppState>, private activateRoute: ActivatedRoute) {
    this.citaGroup = new FormGroup({
      Nombre: new FormControl('', [Validators.required]),
      Descripcion: new FormControl('', [Validators.required]),
      Duracion: new FormControl('', [Validators.required]),
      Color: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    if (this.activateRoute.snapshot.params['id'] && this.activateRoute.snapshot.params['id'] !== undefined) {
      const idCita = this.activateRoute.snapshot.params['id']
      this.update = true
      this.store.dispatch(actions.LoadingCitaDetail({id: idCita}))

      this.store.select(selectors.GetCitasDetail).subscribe( citaDetail => {
        this.citaUpdate = citaDetail;
        this.citaGroup.setValue({
          Nombre: citaDetail.Nombre,
          Descripcion: citaDetail.Descripcion,
          Duracion: citaDetail.Duracion,
          Color: citaDetail.Color
        })
      })
    }
  }

  submit() {
    if (this.citaGroup.invalid) return

    if (this.update) {

      this.citaUpdate = {...this.citaUpdate, ...this.citaGroup.value}
      this.citaUpdate.Actualizacion = new Date().toUTCString();
      this.store.dispatch(actions.LoadingUpdateCita({cita: this.citaUpdate}))
    } else {
      const cita: Cita = this.citaGroup.value;
      cita.Activa = true;
      cita.Creacion = new Date().toUTCString();
      cita.Actualizacion = null

      this.store.dispatch(actions.LoadingCreateCita({cita}))
    }

  }

  get Nombre() {
    return this.citaGroup.get('Nombre')
  }

  get Descripcion() {
    return this.citaGroup.get('Descripcion')
  }

  get Duracion() {
    return this.citaGroup.get('Duracion')
  }

  get Color() {
    return this.citaGroup.get('Color')
  }

}

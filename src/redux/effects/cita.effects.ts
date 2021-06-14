import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromactions from '../actions'
import { switchMap, catchError, mergeMap } from 'rxjs/operators';
import { TYPE_WARNING, TYPE_ERROR, TYPE_SUCCESS } from '../../models/constants';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHandler } from '../../helpers/http-handlers';
import { of } from 'rxjs';
import { CitasService } from '../../app/services/citas.service';

@Injectable()
export class CitaEffects {

    constructor(private actions: Actions, private citasService: CitasService) {}

    loadingLastCitas$ = createEffect(() => this.actions.pipe(
        ofType(fromactions.LoadingLastCitas),
        mergeMap( (action) => this.citasService.getLastCitas(action.size).pipe(
            mergeMap( (response) => {
              return [fromactions.LastCitas({citas: response })]
            }),
            catchError( (error: HttpErrorResponse | any) => {
                if (error?.status != null) {
                    const handler = new HttpHandler(error);
                    return of(
                        fromactions.toastMessageAction({message: handler.getHttpError(), typeNotification: TYPE_ERROR})
                    )
                }
                return of(fromactions.FailGetCita({payload: error.message}))
            })
        ))
    ));

    loadingCitaDetail$ = createEffect(() => this.actions.pipe(
        ofType(fromactions.LoadingCitaDetail),
        switchMap( (action) => this.citasService.getCitaDetail(action.id).pipe(
            switchMap( (response) => {
              console.log(response)
                if (response) {
                  return [fromactions.CitaDetail({cita: response})]
                } else {
                    return [
                        fromactions.toastMessageAction({message: 'No se encuentra la cita', typeNotification: TYPE_WARNING})
                    ]
                }
            }),
            catchError( (error: HttpErrorResponse) => {
                const handler = new HttpHandler(error);
                return [
                    fromactions.toastMessageAction({message: handler.getHttpError(), typeNotification: TYPE_ERROR})
                ]
            })
        ))
    ));

    loadingAllCitas$ = createEffect(() => this.actions.pipe(
        ofType(fromactions.LoadingAllCitas),
        switchMap( (action) => this.citasService.getAllCita(action.page).pipe(
            switchMap( (response) => {
              const total = Number(response.total);
              const pages = total >= 10 ? Math.floor(total / 5) : Math.floor(total / 5) + 1;
              return [fromactions.AllCitas({citas: response.citas, pages, total  })]
            }),
            catchError( (error: HttpErrorResponse) => {
                const handler = new HttpHandler(error);
                return [
                    fromactions.toastMessageAction({message: handler.getHttpError(), typeNotification: TYPE_ERROR})
                ]
            })
        ))
    ));

    loadingCreateCita$ = createEffect(() => this.actions.pipe(
        ofType(fromactions.LoadingCreateCita),
        switchMap( (action) => this.citasService.createCita(action.cita).pipe(
            switchMap( (response) => {
                if (response) {
                  console.log(response)
                  return [
                      fromactions.toastMessageAction({message: `Se creo existosamente la cita ${response.Nombre}`, typeNotification: TYPE_SUCCESS}),
                      fromactions.CreateCitaAction({cita: response })
                  ]
                } else {
                    return [
                        fromactions.toastMessageAction({message: 'Ha ocurrido un error', typeNotification: TYPE_WARNING})
                    ]
                }
            }),
            catchError( (error: HttpErrorResponse) => {
                const handler = new HttpHandler(error);
                return [
                    fromactions.toastMessageAction({message: handler.getHttpError(), typeNotification: TYPE_ERROR})
                ]
            })
        ))
    ));

    loadingUpdateCita$ = createEffect(() => this.actions.pipe(
        ofType(fromactions.LoadingUpdateCita),
        switchMap( (action) => this.citasService.updateCita(action.cita.id, action.cita).pipe(
            switchMap( (response) => {
                if (response) {
                    return [
                        fromactions.toastMessageAction({message: 'Se actualizo exitosamente', typeNotification: TYPE_SUCCESS}),
                        fromactions.UpdateCitaAction({cita: response })
                    ]
                } else {
                    return [
                        fromactions.toastMessageAction({message: 'Ha ocurrido un error', typeNotification: TYPE_WARNING})
                    ]
                }
            }),
            catchError( (error: HttpErrorResponse) => {
                const handler = new HttpHandler(error);
                return [
                    fromactions.toastMessageAction({message: handler.getHttpError(), typeNotification: TYPE_ERROR})
                ]
            })
        ))
    ));

}

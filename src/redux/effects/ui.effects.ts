import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromactions from '../actions';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TYPE_SUCCESS, TYPE_WARNING, TYPE_ERROR, TYPE_INFO } from '../../models/constants';

@Injectable()
export class UiEffects {

    constructor(private actions: Actions, private toastService: ToastrService) {}

    showToastMessage$ = createEffect( () => this.actions.pipe(
        ofType(fromactions.toastMessageAction),
        tap( action => {
            switch (action.typeNotification) {
                case TYPE_SUCCESS:
                    this.toastService.success(action.message);
                    break;
                case TYPE_WARNING:
                    this.toastService.warning(action.message);
                    break;
                case TYPE_ERROR:
                    this.toastService.error(action.message);
                    break;
                case TYPE_INFO:
                    this.toastService.info(action.message);
                    break;
            }
        })
    ), {dispatch: false})
}
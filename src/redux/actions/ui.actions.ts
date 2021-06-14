import { props, createAction } from '@ngrx/store';


export const toogleToolbarAction = createAction(
    '[UI] Toogle toolbar',
    props<{ payload: boolean }>()
);

export const toastMessageAction = createAction(
    '[UI] Toast activation',
    props<{ message: string, typeNotification: number }>()
);

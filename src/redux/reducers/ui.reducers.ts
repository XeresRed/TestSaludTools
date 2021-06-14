import * as UiActions from '../actions/ui.actions'
import { createReducer, on, Action } from '@ngrx/store';

export interface UiState {
    showToolbar: boolean;
    message: string | null;
}

const initState: UiState = {
    showToolbar: true,
    message: null
}

const Reducer = createReducer(
    initState,
    on(UiActions.toogleToolbarAction, (state, {payload}) => ({...state, showToolbar: payload})),
    on(UiActions.toastMessageAction, (state, {message}) => ({...state, message}))
)

export function uiReducer(state = initState, action: Action): UiState {
    return Reducer(state, action)
}

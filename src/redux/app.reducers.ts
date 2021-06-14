import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import * as reducers from './reducers'
import { localStorageSync } from 'ngrx-store-localstorage';
import { UiState } from './reducers/ui.reducers';
import { CitaState } from "./reducers";

export interface AppState {
    citas: CitaState;
    ui: UiState;
}

export const appReducers: ActionReducerMap<AppState> = {
  citas: reducers.citaReducer,
  ui: reducers.uiReducer
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: ['auth', 'citas'],
        rehydrate: true
    })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

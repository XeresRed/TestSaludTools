
import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/cita.actions';
import { Cita } from 'src/models/negocio/cita.model';

export interface CitaState {
    loading: boolean;
    citas: Cita[];
    lastCitas: Cita[];
    pages: number;
    total: number;
    citaDetail: Cita | null;
    error: string | null;
}

const initState: CitaState = {
    loading: false,
    citas: [],
    pages: 1,
    total: 0,
    lastCitas: [],
    citaDetail: null,
    error: null
}


const Reducer = createReducer(
    initState,
    on(
        actions.LoadingLastCitas,
        actions.LoadingCitaDetail,
        actions.LoadingAllCitas,
        actions.LoadingCreateCita,
        actions.LoadingUpdateCita,
        (state) => ({ ...state, loading: true })),
    on(actions.LastCitas, (state, {citas}) => ({ ...state, loading: false, lastCitas: [...citas] })),
    on(actions.CitaDetail, (state, {cita}) => ({ ...state, loading: false, citaDetail: {...cita} })),
    on(actions.AllCitas, (state, {citas, pages, total}) => ({ ...state, loading: false, citas: [...citas], pages, total })),
    on(actions.CreateCitaAction, (state, {cita}) => ({...state, loading: false, citas: [...state.citas, cita]})),
    on(actions.UpdateCitaAction, (state, {cita}) => ({...state, loading: false, citaDetail: {...cita}}))
);

export function citaReducer(state = initState, action: Action): CitaState {
    return Reducer(state, action)
}

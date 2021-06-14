import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { CitaState } from '../reducers/cita.reducer';


const SelectCitaState = (state: AppState) => state.citas

export const GetLoadingCita = createSelector(
  SelectCitaState,
  (state: CitaState) => state.loading
);

export const GetAllCitas = createSelector(
  SelectCitaState,
  (state: CitaState) => ({citas: state.citas, pages: state.pages, total: state.total})
);

export const GetLastCitas = createSelector(
  SelectCitaState,
  (state: CitaState) => state.lastCitas
);

export const GetCitasDetail = createSelector(
  SelectCitaState,
  (state: CitaState) => state.citaDetail
)

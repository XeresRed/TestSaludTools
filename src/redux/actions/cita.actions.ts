import { createAction, props } from '@ngrx/store';
import { Cita } from 'src/models/negocio/cita.model';

export const LoadingAllCitas = createAction(
    '[CITA] Loading all citas',
    props<{ page: number}>()
);

export const AllCitas = createAction(
    '[CITA] All citas',
    props<{ citas: Cita[], pages: number, total: number}>()
);

export const LoadingLastCitas = createAction(
    '[CITA] Loading last citas',
    props<{ size: number}>()
);

export const LastCitas = createAction(
    '[CITA] Last citas',
    props<{ citas: Cita[]}>()
);

export const LoadingCitaDetail = createAction(
    '[CITA] Loading cita detail',
    props<{ id: number}>()
);

export const CitaDetail = createAction(
    '[CITA] Cita detail',
    props<{ cita: Cita }>()
);

export const LoadingCreateCita = createAction(
    '[CITA] Loading create cita',
    props<{ cita: Cita}>()
);

export const CreateCitaAction = createAction(
    '[CITA] Create cita',
    props<{ cita: Cita}>()
);

export const LoadingUpdateCita = createAction(
    '[CITA] Loading update cita',
    props<{cita: Cita}>()
);

export const UpdateCitaAction = createAction(
    '[CITA] Update cita',
    props<{ cita: Cita}>()
);


export const FailGetCita = createAction(
  '[CITA] Fail Get cita',
  props<{ payload: string}>()
);

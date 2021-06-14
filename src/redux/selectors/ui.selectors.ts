import { AppState } from '../app.reducers';
import { createSelector } from '@ngrx/store';
import { UiState } from '../reducers/ui.reducers';


const SelectUiState = (state: AppState) => state.ui;

export const GetSidebarStatus = createSelector(
    SelectUiState,
    (state: UiState) => state.showToolbar
)
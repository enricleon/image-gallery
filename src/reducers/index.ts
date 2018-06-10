import * as fromImages from './images';
import * as fromModal from './modal';
import { combineReducers } from 'redux';

export interface State {
    images: fromImages.State,
    modal: fromModal.State
}

export const initialState: State = {
    images: fromImages.initialState,
    modal: fromModal.initialState
}

export const reducer = combineReducers<State>({
    images: fromImages.reducer,
    modal: fromModal.reducer,
})
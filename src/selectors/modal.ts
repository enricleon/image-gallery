import { State } from '../reducers';
import { createSelector } from 'reselect';
import { Image } from '../models/image';

const getModalState = ((state: State) => state.modal);

export const getCurrentImage = createSelector([getModalState], (state) => {
    return state.currentImage;
});

export const getShowModal = createSelector([getModalState], (state) => {
    return state.show;
});
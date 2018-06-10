import { Action, ActionTypes } from "../actions/modal";
import { Image } from "../models/image";

export interface State {
    currentImage: number,
    show: boolean
}

export const initialState = {
    currentImage: 0,
    show: false
}

export function reducer(state: State = initialState, action: Action): State {
    switch(action.type) {

        case ActionTypes.SET_CURRENT_IMAGE: {
            return {
                ...state,
                currentImage: action.payload.currentImage
            };
        }

        case ActionTypes.NEXT_IMAGE: {
            return {
                ...state,
                currentImage: state.currentImage + 1 > action.payload.max ? action.payload.max : state.currentImage + 1
            };
        }

        case ActionTypes.PREV_IMAGE: {
            return {
                ...state,
                currentImage: state.currentImage - 1 < 0 ? 0 : state.currentImage - 1
            };
        }

        case ActionTypes.TOGGLE_MODAL: {
            return {
                ...state,
                show: !state.show
            };
        }

        default: 
            return state;
    }
}
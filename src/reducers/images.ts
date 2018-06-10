import { Action, ActionTypes } from "../actions/images";
import { Image } from "../models/image";

export interface State {
    images: Array<Image>,
    columns: number,
    page: number,
    isLoading: boolean,
    haveErrored: boolean
}

export const initialState = {
    images: new Array<Image>(),
    columns: typeof window === 'object' ? Math.ceil(window.innerWidth / 350) : 4,
    page: 1,
    isLoading: false,
    haveErrored: false
}

export function reducer(state: State = initialState, action: Action): State {
    switch(action.type) {
        
        case ActionTypes.NEXT_PAGE: {
            return {
                ...state,
                page: action.payload.page + 1
            };
        }

        case ActionTypes.LIST_IMAGES_LOADING: {
            return {
                ...state,
                isLoading: action.payload.isLoading
            };
        }

        case ActionTypes.LIST_IMAGES_ERROR: {
            return {
                ...state,
                isLoading: action.payload.haveErrored = action.payload.haveErrored
            };
        }


        case ActionTypes.LIST_IMAGES_FETCH_SUCCESS: {
            return {
                ...state,
                images: [...state.images, ...action.payload.images]
            };
        }

        case ActionTypes.SET_COLUMNS: {
            return {
                ...state,
                columns: action.payload.columns
            };
        }

        default: 
            return state;
    }
}
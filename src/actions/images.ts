import { Image } from "../models/image";
import { Filter } from "../models/filter";

export enum ActionTypes {
    SET_COLUMNS = '[Images] SET_COLUMNS',
    NEXT_PAGE = '[Images] NEXT_PAGE',
    IMAGE_SET_HEIGHT = '[Images] IMAGE_SET_HEIGHT',
    LIST_IMAGES_FETCH_SUCCESS = '[Images] LIST_IMAGES_FETCH_SUCCESS',
    LIST_IMAGES_ERROR = '[Images] LIST_IMAGES_ERROR',
    LIST_IMAGES_LOADING = '[Images] LIST_IMAGES_LOADING'
}

export interface SetColumnsAction { type: ActionTypes.SET_COLUMNS, payload: { columns: number }}
export interface NextPageAction { type: ActionTypes.NEXT_PAGE, payload: { page: number }}
export interface ImageSetHeightAction { type: ActionTypes.IMAGE_SET_HEIGHT, payload: { id: string, height: number }}
export interface ListImagesFetchSuccessAction { type: ActionTypes.LIST_IMAGES_FETCH_SUCCESS, payload: { images: Array<Image> }}
export interface ImagesHaveErroredAction { type: ActionTypes.LIST_IMAGES_ERROR, payload: { haveErrored: boolean }}
export interface ImagesAreLoadingAction { type: ActionTypes.LIST_IMAGES_LOADING, payload: { isLoading: boolean }}

export function setColumns(columns: number): SetColumnsAction {
    return {
        type: ActionTypes.SET_COLUMNS,
        payload: { columns }
    }
}

export function nextPage(page: number): NextPageAction {
    return {
        type: ActionTypes.NEXT_PAGE,
        payload: { page }
    }
}

export function imageSetHeight(id: string, height: number): ImageSetHeightAction {
    return {
        type: ActionTypes.IMAGE_SET_HEIGHT,
        payload: { id, height }
    }
}

export function listImagesFetchSuccess(images: Array<Image>): ListImagesFetchSuccessAction {
    return {
        type: ActionTypes.LIST_IMAGES_FETCH_SUCCESS,
        payload: {
            images: images
        }
    }
}

export function imagesHaveErroredAction(haveErrored: boolean): ImagesHaveErroredAction {
    return {
        type: ActionTypes.LIST_IMAGES_ERROR,
        payload: {
            haveErrored: haveErrored
        }
    }
}

export function imagesAreLoadingAction(isLoading: boolean): ImagesAreLoadingAction {
    return {
        type: ActionTypes.LIST_IMAGES_LOADING,
        payload: {
            isLoading: isLoading
        }
    }
}

export function imagesFetchData(filter: Filter) {
    return (dispatch) => {
        dispatch(imagesAreLoadingAction(true));

        let url = "api/v1/images/" + filter.text;

        if(filter.page || filter.limit) {
            url = url + "?";
            if(filter.page) url = url + "page=" + filter.page + "&";
            if(filter.limit) url = url + "limit=" + filter.limit + "&";  
        }

        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(imagesAreLoadingAction(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(listImagesFetchSuccess(items)))
            .catch(() => dispatch(imagesHaveErroredAction(true)));
    };
}

export type Action = 
    ImageSetHeightAction | 
    ListImagesFetchSuccessAction | 
    ImagesHaveErroredAction | 
    ImagesAreLoadingAction | 
    ImageSetHeightAction | 
    NextPageAction |
    SetColumnsAction;
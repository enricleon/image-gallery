import { Image } from "../models/image";

export enum ActionTypes {
    NEXT_IMAGE = '[Modal] NEXT_IMAGE',
    PREV_IMAGE = '[Modal] PREV_IMAGE',
    TOGGLE_MODAL = '[Modal] TOGGLE_MODAL',
    SET_CURRENT_IMAGE = '[Modal] SET_CURRENT_IMAGE'
}

export interface SetCurrentImageAction { type: ActionTypes.SET_CURRENT_IMAGE, payload: { currentImage: number }}
export interface NextImageAction { type: ActionTypes.NEXT_IMAGE, payload: { max: number } }
export interface PrevImageAction { type: ActionTypes.PREV_IMAGE }
export interface ToggleModalAction { type: ActionTypes.TOGGLE_MODAL }

export function setCurrentImage(currentImage: number): SetCurrentImageAction {
    return {
        type: ActionTypes.SET_CURRENT_IMAGE,
        payload: { currentImage }
    }
}

export function nextImage(max: number): NextImageAction {
    return {
        type: ActionTypes.NEXT_IMAGE,
        payload: { max }
    }
}

export function prevImage(): PrevImageAction {
    return {
        type: ActionTypes.PREV_IMAGE
    }
}

export function toggleModal(): ToggleModalAction {
    return {
        type: ActionTypes.TOGGLE_MODAL
    }
}

export type Action = 
    NextImageAction | 
    PrevImageAction |
    ToggleModalAction |
    SetCurrentImageAction;
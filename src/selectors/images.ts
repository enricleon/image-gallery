import { State } from '../reducers';
import { createSelector } from 'reselect';
import { Image } from '../models/image';

const getImageState = ((state: State) => state.images);

export const getIsLoading = createSelector([getImageState], (state) => {
    return state.isLoading;
});

export const getPage = createSelector([getImageState], (state) => {
    return state.page;
});

export const getImages = createSelector([getImageState], (state) => {
    return state.images;
});

export const getColumns = createSelector([getImageState], (state) => {
    return state.columns;
});

// Let's get our images grouped for the render to display it in columns 
export const getImagesInColumns = createSelector([getImages, getColumns], (images, columns) => {
    return images.reduce((acc: any, image: Image) => {
        let nextIndex = acc.heights.findIndex((x, index) => !x);

        if(nextIndex === -1) {
            nextIndex = acc.heights.reduce((acc, x, i, arr) => x < arr[acc] ? i : acc, 0);
        }

        acc.value[nextIndex] = acc.value[nextIndex] ? [...acc.value[nextIndex], image] : [image];
        acc.heights[nextIndex] = (acc.heights[nextIndex] || 0) + image.normalizedHeight + 0.2;
        return acc;
    }, { columns: columns, heights: Array<number>(columns), value: [] }).value;
});
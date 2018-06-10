import * as Flickr from 'flickr-sdk';

import { ImageRepository } from './interfaces/image.repository';
import { FlickrSearchResponse } from '../models/response-models/flickr.model';
import { FlickrSizeResponse } from '../models/response-models/flickr.model';

import { Image, ImageSize } from '../models/image.model';
import { Filter } from '../models/filter.model';

class FlickrRepository implements ImageRepository {
    private flickr: Flickr;

    constructor() {
        this.flickr = new Flickr("c51674bfd8636f36ebaf68a05abb9bf7");
    }

    async getImageSize(id: string): Promise<{ original: ImageSize, thumbnail: ImageSize }> {
        return await this.flickr.photos.getSizes({
            photo_id: id
        })
        .then((responseModel: FlickrSizeResponse) => {
            let thumbnail = ImageSize.FromFlickr(responseModel.body.sizes.size.find(size => size.label === "Thumbnail"));
            let original = ImageSize.FromFlickr(responseModel.body.sizes.size[responseModel.body.sizes.size.length - 1]);

            return { original, thumbnail };
        })
        .catch(function (err) {
            console.error('Somethign went wrong', err);
        });
    }

    async getImages(filter: Filter): Promise<Array<Image>> {
        let flickrOptions:any = {
            text: filter.text,
            content_type: 7,
            sort: 'relevance'
        };

        if(filter.limit) flickrOptions.per_page = filter.limit;
        if(filter.page) flickrOptions.page = filter.page;

        return await this.flickr.photos.search(flickrOptions)
        .then(async (responseModel: FlickrSearchResponse) => {
            const images = await Promise.all(responseModel.body.photos.photo.map(async (photo) => {
                const sizes = await this.getImageSize(photo.id);

                const image = Image.FromFlickr(photo, sizes.original, sizes.thumbnail);
                return image;
            }));
            
            return images;
        })
        .catch(function (err) {
            console.error('Somethign went wrong', err);
        });
    }
};

export const flickrRepository = new FlickrRepository();
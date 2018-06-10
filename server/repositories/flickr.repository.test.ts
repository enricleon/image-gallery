import { should, assert } from 'chai';
import { flickrRepository } from './flickr.repository';
import { Image } from '../models/image.model';
import { Filter } from '../models/filter.model';
should();

describe('Flickr Repository Test Suite', function () {
    it("Can return an array of images", function () {
        let filter = new Filter();
        filter.text = "cats";
        const result: Promise<Array<Image>> = flickrRepository.getImages(filter);

        result.then((images:Array<Image>) => {
            assert(Array.isArray(images), `Should return: an array, but returned: ${result}`);
        })
    });
});
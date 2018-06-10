import { Image } from "../models/image.model";
import { flickrRepository } from '../repositories/flickr.repository';
import { Filter } from "../models/filter.model";

export class ImageService {
    
    public async getById(id: number): Promise<Image> {
        return new Promise<Image>((resolve, reject) => {
            const image = new Image();
            image.title = id.toString();

            resolve(image);
        });
    }

    public async list(filter: Filter): Promise<Image[]> {
        return await flickrRepository.getImages(filter);
    }
}

export const imageService = new ImageService();
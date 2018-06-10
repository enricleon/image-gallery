import * as moment from 'moment';
import { Moment } from 'moment';

export class ImageSize {
    public height: number;
    public width: number;
    public url: string;
    public source: string;

    static FromFlickr(flickrSize: {height: string, width: string, url: string, source: string}): ImageSize {
        if(flickrSize) {
            let imageSize = new ImageSize();
            imageSize.height = parseInt(flickrSize.height);
            imageSize.width = parseInt(flickrSize.width);
            imageSize.url = flickrSize.url;
            imageSize.source = flickrSize.source;
    
            return imageSize;
        }

        return null;
    }
}

export class Image {
    public id: string;
    public link: string;
    public src: string;
    public thumbnailSrc: string;
    public originalSrc: string;
    public title: string;
    public published: Moment;
    public author: string;
    public category: string;
    public normalizedHeight: number;

    static FromFlickr(flickrPhoto: { 
            id: string, 
            title: string, 
            user: string,
            farm: string, 
            server: string, 
            secret: string  
        }, originalSize: ImageSize, thumbnail: ImageSize) {
        if(originalSize) {
            let image = new Image();
            image.id = flickrPhoto.id;
            image.title = flickrPhoto.title;
            image.author = flickrPhoto.user;
            image.link = originalSize.url;
            image.src = `https://farm${flickrPhoto.farm}.staticflickr.com/${flickrPhoto.server}/${flickrPhoto.id}_${flickrPhoto.secret}.jpg`;
            image.originalSrc = originalSize.source;
            image.thumbnailSrc = thumbnail.source;
            image.normalizedHeight = originalSize.height / originalSize.width;
    
            return image;
        }

        return null;
    }
}
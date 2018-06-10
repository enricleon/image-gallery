import * as moment from 'moment';
import { Moment } from 'moment';

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
}
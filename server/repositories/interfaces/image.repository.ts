import { Filter } from "../../models/filter.model";

export interface ImageRepository {
    getImages(filter: Filter);
}
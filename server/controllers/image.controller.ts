import { Controller } from "./controller";
import { HttpServer } from "../server/httpServer";
import { Request, Response } from "restify";
import { imageService } from "../services/image.service";
import { Filter } from "../models/filter.model";

export class ImageController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('/images/:searchTerm', this.list.bind(this));
    }

    private async list(req: Request, res: Response): Promise<void> {
        let filter = new Filter();
        filter.text = req.params.searchTerm;

        if(req.query && req.query.limit) filter.limit = req.query.limit;
        if(req.query && req.query.page) filter.page = req.query.page;

        res.send(await imageService.list(filter));
    }
}
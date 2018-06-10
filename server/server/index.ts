const path = require('path');

import serverRenderer from '../middleware/renderer';
import * as express from 'express';
import { Router, RequestHandler } from 'express';
import { HttpServer } from '../server/httpServer';

import { CONTROLLERS } from '../controllers';

export class ApiServer implements HttpServer {
    private router: Router;
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    get(url: string, requestHandler: RequestHandler): void {
        this.addApiRoute('get', url, requestHandler);
    }
    post(url: string, requestHandler: RequestHandler): void {
        this.addApiRoute('post', url, requestHandler);
    }
    put(url: string, requestHandler: RequestHandler): void {
        this.addApiRoute('put', url, requestHandler);
    }
    del(url: string, requestHandler: RequestHandler): void {
        this.addApiRoute('del', url, requestHandler);
    }

    private addApiRoute(method: 'get' | 'post' | 'put' | 'del', url: string, requestHandler: RequestHandler) {
        const flyHandler = async (req: any, res: any, next: any) => {
            try {
                await requestHandler(req, res, next);
            }
            catch (e) {
                console.log(e);
                res.send(500, e);
            }
        }

        url = this.baseUrl + url;

        switch(method) {
            case 'get': {
                this.router.get(url, flyHandler);
                break;
            }
            case 'post': {
                this.router.post(url, flyHandler);
                break;
            }
            case 'put': {
                this.router.put(url, flyHandler);
                break;
            }
            case 'del': {
                this.router.delete(url, flyHandler);
                break;
            }
            default:
                break;
        }

        console.log(`Added route ${method.toUpperCase()}: ${url}`);
    }

    public start(port: number): void {
        const app: express.Application = express();
        this.router = express.Router();

        CONTROLLERS.forEach(controller => controller.initialize(this));

        this.router.use(express.static(
            path.resolve(__dirname, '../..', 'build'),
            { maxAge: '30d' },
        ));
        this.router.use('/*', serverRenderer);
    
        // this.restify = restify.createServer();
        // this.restify.use(restify.plugins.bodyParser());
        // this.restify.use(restify.plugins.queryParser());

        app.use(this.router);
    
        app.listen(port, (error: any) => {
            if (error) {
                return console.log('something bad happened', error);
            }
    
            console.log("listening on " + port + "...");
        });
    }
}
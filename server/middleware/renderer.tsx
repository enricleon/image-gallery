import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

// import our main App component
import App from '../../src/components/App';
import store from '../../src/store';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const path = require("path");
const fs = require("fs");

export default (req: any, res: any, next: any) => {
    const context: any = {};

    // render the app as a string
    const app = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter context={context}>
                <App />
            </StaticRouter>
        </Provider>);

    // point to the html file created by CRA's build tool
    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err: any, data: any) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }

        if (context.status === 404) {
            res.status(404);
        }

        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        );
    });
}
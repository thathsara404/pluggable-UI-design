/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use strict';

import * as express from 'express';
import config from './app/config/config';
import healthRoute from './app/route/healthRoute';
import launchRoute from './app/route/launchRoute';

const app = express();
// Parses incoming requests with JSON payloads (body-parser)
app.use(express.json());
// Parses incoming requests with HTML Form (body-parser) 
app.use(express.urlencoded({ extended: true }));

// Static Files through /dist path since we have multiple versions
app.use('/app-dist/public', express.static(__dirname + '/app-dist/public'));
// Set Template Engine
app.set('views', '/app-dist/public');
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-var-requires
app.engine('html', require('ejs').renderFile);

// Consume API Routes
app.use(config.ROUTE_PATH, healthRoute);
app.use(config.ROUTE_PATH, launchRoute);

// Consume Error Handler middleware
app.use((err: object, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('Error from error handler');
});

const App = app;
export default App;

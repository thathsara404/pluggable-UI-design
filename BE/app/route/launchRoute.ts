'use strict';

import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
import * as path from 'path';
import config from '../config/config';
import RoutePath from './const/routePath';

/**
 * To access the dev world
 */
router.get(RoutePath.DEV_LAUNCH, (req: Request, res: Response, next: NextFunction): void => {
    // Launch the dev entry HTML from current app version
    try {
        const main = require.main as {filename: string};
        res.render(path.dirname(main.filename) + 
        '/public/index.html', { token: 'jubc234bwkpqren', url: config.UI_URL });
    } catch (error) {
        console.log('Error from launch: ', error);
        next(error);
    }
});

export default router;

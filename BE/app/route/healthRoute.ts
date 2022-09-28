'use strict';

import { Router, Request, Response, NextFunction } from 'express';
import RoutePath from './const/routePath';
import { HTTPSuccess } from './const/httpCode';
const router = Router();

const HealthRoutePath: string = RoutePath.HEALTH;

/**
 * Health route
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
router.get(HealthRoutePath, (req: Request, res: Response, next: NextFunction): void => {
    try {
        const response: object = { success: 'User-API is up and running...' };
        res.status(HTTPSuccess.OK_CODE).json(response);
    } catch (error) {
        console.log('Error from health: ', error);
        next(error);
    }
});

export default router;

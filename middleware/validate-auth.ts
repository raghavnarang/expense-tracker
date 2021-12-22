import { NextFunction, Request, Response } from 'express';
import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import winston from 'winston';

const serviceAccount = require("../fb-auth.json");

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const auth = getAuth(app);

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = Array.isArray(req.headers['x-id-token']) ? req.headers['x-id-token'][0] : req.headers['x-id-token'];
    if (!token) {
        return next(new Error('Invalid token'));
    }

    auth
        .verifyIdToken(token)
        .then((decodedToken) => {
            console.log(decodedToken);
            const logConfiguration = {
                'transports': [
                    new winston.transports.Console()
                ]
            };
            const logger = winston.createLogger(logConfiguration);
            logger.error(decodedToken);
            res.locals.user = {
                email: decodedToken.email,
                userId: decodedToken.user_id
            }
            return next();
        })
        .catch((error) => {
            return next(error);
        });
};

export default verifyAuth;
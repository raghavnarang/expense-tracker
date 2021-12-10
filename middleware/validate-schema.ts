import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validateSchema = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate({ ...req.params, ...req.body, ...req.query });
    if (!!result.error) {
        next(result.error);
    }

    res.locals.data = result.value;
    next();
}
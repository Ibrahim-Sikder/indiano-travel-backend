import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const requestValidation = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        cookies: req.cookies,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };
};

import { NextFunction, Request, Response } from 'express';
import AppError from '../../errors/appError';

const parseBodyData = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body && req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  } catch (error) {
    throw new AppError(400, 'Invalid JSON data');
  }
};

export default parseBodyData;

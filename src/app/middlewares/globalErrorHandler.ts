import { ErrorRequestHandler } from 'express';
import { MulterError } from 'multer';
import { ZodError } from 'zod';
import config from '../../config';
import AppError from '../../errors/appError';
import handleDuplicateError from '../../errors/handleDuplicateError';
import handleUploadError from '../../errors/handleUploadError ';
import handleZodError from '../../errors/handleZodError';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';

  //   formatted error
  if (err instanceof ZodError) {
    const formateError = handleZodError(err);
    statusCode = formateError?.statusCode;
    message = formateError?.message;
  } else if (err instanceof MulterError) {
    const formateError = handleUploadError(err);
    statusCode = formateError.statusCode;
    message = formateError.message;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
  }

  //   send error response
  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

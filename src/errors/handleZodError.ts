import { ZodError } from 'zod';
import { TErrorResponse } from '../types/error';

const handleZodError = (err: ZodError): TErrorResponse => {
  const errorMessage = err.errors
    .map((err) => {
      return err?.path[err?.path?.length - 1] + ' is ' + err?.message;
    })
    .join(', ');

  const statusCode = 400;

  return {
    statusCode,
    message: errorMessage,
  };
};

export default handleZodError;

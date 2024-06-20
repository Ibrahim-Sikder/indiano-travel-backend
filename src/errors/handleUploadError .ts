import { MulterError } from 'multer';
import { TErrorResponse } from '../types/error';

const handleUploadError = (err: MulterError): TErrorResponse => {
  return {
    statusCode: 400,
    message: `File upload error: ${err?.message}`,
  };
};

export default handleUploadError;

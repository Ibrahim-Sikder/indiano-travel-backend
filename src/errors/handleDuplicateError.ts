import { TErrorResponse } from '../types/error';

const handleDuplicateError = (err: any): TErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);
  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const statusCode = 400;
  return {
    statusCode,
    message: `${extractedMessage} is already exists.`,
  };
};

export default handleDuplicateError;

import { Response } from 'express';
import { responseError } from './response';

interface HandleErrorProps {
  error: unknown;
  message: string;
}
export const handleError = ({error, message}: HandleErrorProps) => {
  if (error instanceof Error) {
    throw new Error(error.message);
  }
  throw new Error(message);
}

interface HandleControllerErrorProps {
  res: Response;
  error: unknown;
  message: string;
  statusCode: number;
}
export const handleControllerError = (errorPropps: HandleControllerErrorProps) => {
  if (errorPropps.error instanceof Error) {
    responseError(errorPropps.res, errorPropps.error.message, errorPropps.message, errorPropps.statusCode);
    return
  }
  responseError(errorPropps.res, 'Internal Server Error', errorPropps.message, 500);
  return
}

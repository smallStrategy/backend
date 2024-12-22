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

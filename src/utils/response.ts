import { Response } from 'express';

// 요청에 대한 응답 데이터 형식 정의
export interface ResponseData<T> {
  message: string;
  data?: T; 
  error?: string;
}

// 성공 응답 처리 함수
export const responseSuccess = <T>(res: Response, data: T, message = "Request was successful", statusCode = 200) => {
  const response: ResponseData<T> = {
    message,
    data
  };
  return res.status(statusCode).json(response);
};

// 실패 응답 처리 함수
export const responseError = (res: Response, error: string, message = "An error occurred", statusCode = 400) => {
  const response: ResponseData<null> = {
    message,
    error
  };
  return res.status(statusCode).json(response);
};

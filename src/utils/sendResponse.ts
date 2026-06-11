import { Response } from "express";

export interface TMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

export interface TResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  meta?: TMeta;
}

export const sendResponse = <T>(
  res: Response,
  payload: TResponse<T>
) => {
  const { statusCode, success, message, data, meta } = payload;

  return res.status(statusCode).json({
    success,
    statusCode,
    message,
    ...(meta && { meta }), // only include if exists
    ...(data !== undefined && { data }),
  });
};
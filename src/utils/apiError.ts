export default class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;

    // Fix prototype chain (important for TypeScript + inheritance)
    Object.setPrototypeOf(this, new.target.prototype);

    // Capture stack trace (clean debugging)
    Error.captureStackTrace(this, this.constructor);
  }
}
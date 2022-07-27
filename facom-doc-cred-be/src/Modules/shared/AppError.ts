export interface IAppError {
  message: string;
  statusCode: number;
}

class AppError implements IAppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;

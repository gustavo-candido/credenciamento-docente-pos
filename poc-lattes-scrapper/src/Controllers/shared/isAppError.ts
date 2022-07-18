import AppError, { IAppError } from "./AppError";

const isAppError = (err: any): err is IAppError => err instanceof AppError;

export default isAppError;

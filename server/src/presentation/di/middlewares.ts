import ErrorHandler from "../middlewares/ErrorHandler";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { tokenService } from "./services";

export const errorHandler = ErrorHandler.exec;
export const authMiddleware = new AuthMiddleware(tokenService);
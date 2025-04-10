import { NODE_ENV } from "@/config";
import { CustomError } from "@/domain/entities/CustomError";
import { StatusCode } from "@/types";
import logger from "@/utils/logger";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export default class ErrorHandler {
    static exec(err: any, req: Request, res: Response, next: NextFunction) {
        const message = err.message || "Internal server error";
        const statusCode = err.statusCode || StatusCode.INTERNAL_SERVER_ERROR;
        const stack = err.stack;
        console.log(err);
        if (err instanceof CustomError) {
            res.status(statusCode).json({
                message
            });
            return;
        }

        if (err instanceof ZodError) {
            res.status(StatusCode.BAD_REQUEST).json({
                message: err.errors.map((error) => error.message).join(", ")
            });
            return;
        }

        // ! log the unexpected errors
        logger.error(err);

        res.status(statusCode).json({
            message,
            stack: NODE_ENV !== "production" ? stack : undefined
        });
    }
}

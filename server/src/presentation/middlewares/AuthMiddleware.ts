import { UnauthorizedError } from "@/domain/entities/CustomError";
import ITokenService from "@/domain/service/ITokenService";
import { CustomRequest } from "@/types";
import { Response, NextFunction } from "express";

export default class AuthMiddleware {
    constructor(
        private readonly tokenService: ITokenService
    ) {
        this.exec = this.exec.bind(this);
    }
    exec(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization || req.headers.Authorization;
            if (!authHeader || typeof authHeader !== "string") {
                throw new UnauthorizedError("Invalid authorization header");
            }

            const token = authHeader.split("Bearer ")[1];
            if (!token) {
                throw new UnauthorizedError("Invalid authorization header");
            }

            const decoded = this.tokenService.verifyToken(token);

            if (!decoded) {
                throw new UnauthorizedError("Invalid token");
            }

            if (!decoded.id) {
                throw new UnauthorizedError("Invalid token");
            }

            req.user = decoded;
            next();
        } catch (error) {
            next(error);
        }
    }
}
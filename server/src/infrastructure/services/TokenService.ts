import { UnauthorizedError } from "@/domain/entities/CustomError";
import ITokenService, { TokenPayload } from "@/domain/service/ITokenService";
import jwt from "jsonwebtoken";

export default class TokenService implements ITokenService {
    generateToken(payload: TokenPayload): string {
        return jwt.sign(payload, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
    }

    verifyToken(token: string): TokenPayload | null {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
            return decoded as TokenPayload;
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                throw new UnauthorizedError("Invalid token");
            }
            throw error;
        }
    }
}   
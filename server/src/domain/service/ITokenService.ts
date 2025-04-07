import { UserRole } from "@/types";

export interface TokenPayload {
    id: string;
    email: string;
    role: UserRole;
}

export default interface ITokenService {
    generateToken(payload: TokenPayload): string;
    verifyToken(token: string): TokenPayload | null;
}

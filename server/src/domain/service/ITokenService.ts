export default interface ITokenService {
    generateToken(payload: any): string;
    verifyToken(token: string): any;
}

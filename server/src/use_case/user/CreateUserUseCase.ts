import IUserRepository from "@/domain/repositories/IUserRepository";
import ITokenService from "@/domain/service/ITokenService";
import { UserRole } from "@/types";
import { z } from "zod";

interface CreateUserQuery {
    email: string;
    name: string;
    image: string;
}

export default class CreateUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly tokenService: ITokenService
    ) { }

    async exec(query: CreateUserQuery): Promise<string> {
        const { email, name, image } = createUserSchema.parse(query);
        const user = await this.userRepository.create({ email, name, image });

        const token = this.tokenService.generateToken({ email, id: user._id!, role: UserRole.USER });

        return token;
    }
}

const createUserSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    image: z.string(),
});
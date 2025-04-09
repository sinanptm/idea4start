import IUser from "@/domain/entities/IUser";
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

    async exec(query: CreateUserQuery): Promise<{ user: IUser, token: string; }> {
        const { email, name, image } = createUserSchema.parse(query);

        let user = await this.userRepository.findByEmail(email);
        if (!user) {
            user = await this.userRepository.create({ email, name, image });
        } else {
            user = await this.userRepository.update(user._id!, { email, name, image }) as IUser;
        }

        const token = this.tokenService.generateToken({ email, id: user._id!, role: UserRole.USER });

        user = {
            _id: user._id!,
            email: user.email,
            name: user.name,
            image: user.image
        };

        return {
            user,
            token
        };
    }
}

const createUserSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    name: z.string({ required_error: "Name is required" }),
    image: z.string({ required_error: "Image is required" }),
});
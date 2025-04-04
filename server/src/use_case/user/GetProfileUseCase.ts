import IUserRepository from "@/domain/repositories/IUserRepository";
import { NotFoundError } from "@/domain/entities/CustomError";
import IUser from "@/domain/entities/IUser";

export default class GetProfileUseCase {
    constructor(
        private readonly userRepository: IUserRepository
    ) { }

    async exec(userId: string): Promise<IUser> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return user;
    }

}       
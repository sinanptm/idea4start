import { IUserRepository } from "@/domain/repositories/IUserRepository";
import IUser from "@/domain/entities/IUser";

export default class UpdateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async exec(query: IUser): Promise<IUser> {
        return {} as IUser;
    }
}                   
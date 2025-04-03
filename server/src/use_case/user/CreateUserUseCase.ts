import IUserRepository from "@/domain/repositories/IUserRepository";

interface CreateUserQuery {
    email: string;
    name: string;
    image: string;
}

export default class CreateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async exec(query: CreateUserQuery): Promise<string> {
        // token
        return "";
    }
}           
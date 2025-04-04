import ICommentRepository from "@/domain/repositories/ICommentRepository";
import IComment from "@/domain/entities/IComment";
import IUserRepository from "@/domain/repositories/IUserRepository";
import { UnauthorizedError, BadRequestError } from "@/domain/entities/CustomError";

interface CreateCommentQuery {
    ideaId: string;
    content: string;
    userId: string;
}

export default class CreateCommentUseCase {
    constructor(
        private readonly commentRepository: ICommentRepository,
        private readonly userRepository: IUserRepository
    ) { }

    async exec(query: CreateCommentQuery): Promise<IComment> {
        if (!query.ideaId || !query.content || !query.userId || query.content.trim() === "") {
            throw new BadRequestError("Invalid request content, ideaId, userId is required");
        }
        const user = await this.userRepository.findById(query.userId);
        if (!user) {
            throw new UnauthorizedError("User not found");
        }

        const comment = await this.commentRepository.create({
            ideaId: query.ideaId,
            content: query.content,
            userId: query.userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        if (!comment) {
            throw new BadRequestError("Failed to create comment");
        }

        return comment;
    }
}
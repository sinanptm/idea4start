import { UnauthorizedError, NotFoundError } from "@/domain/entities/CustomError";
import ICommentRepository from "@/domain/repositories/ICommentRepository";
import IUserRepository from "@/domain/repositories/IUserRepository";

interface DeleteCommentQuery {
    commentId: string;
    userId: string;
    ideaId: string;
}

export default class DeleteCommentUseCase {
    constructor(
        private readonly commentRepository: ICommentRepository,
        private readonly userRepository: IUserRepository,
    ) { }

    async exec(query: DeleteCommentQuery): Promise<void> {
        const user = await this.userRepository.findById(query.userId);
        if (!user) {
            throw new UnauthorizedError("User not found");
        }
        const comment = await this.commentRepository.findById(query.commentId);
        if (!comment) {
            throw new NotFoundError("Comment not found");
        }
        if (comment.userId !== user._id) {
            throw new UnauthorizedError("User not authorized to delete this comment");
        }
        await this.commentRepository.delete(query.commentId);
    }
}   
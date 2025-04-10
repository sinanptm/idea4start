import { UnauthorizedError, BadRequestError, NotFoundError } from "@/domain/entities/CustomError";
import IComment from "@/domain/entities/IComment";
import ICommentRepository from "@/domain/repositories/ICommentRepository";
import IUserRepository from "@/domain/repositories/IUserRepository";

interface UpdateCommentQuery {
    commentId: string;
    content: string;
    userId: string;
}

export default class UpdateCommentUseCase {
    constructor(
        private readonly commentRepository: ICommentRepository,
        private readonly userRepository: IUserRepository,
    ) { }

    async exec(query: UpdateCommentQuery): Promise<IComment> {
        if (!query.commentId || !query.content || !query.userId || query.content.trim() === "") {
            throw new BadRequestError("Invalid request content, commentId, userId is required");
        }
        const user = await this.userRepository.findById(query.userId);
        if (!user) {
            throw new UnauthorizedError("User not found");
        }
        const comment = await this.commentRepository.findById(query.commentId);
        if (!comment) {
            throw new NotFoundError("Comment not found");
        }
        if (comment.userId !== user._id) {
            throw new UnauthorizedError("User not authorized to update this comment");
        }
        comment.content = query.content;
        await this.commentRepository.update(query.commentId, comment);
        return comment;
    }
}   
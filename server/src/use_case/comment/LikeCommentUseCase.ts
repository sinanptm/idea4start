import { UnauthorizedError } from "@/domain/entities/CustomError";
import { NotFoundError } from "@/domain/entities/CustomError";
import ICommentLikeRepository from "@/domain/repositories/ICommentLikeRepository";
import ICommentRepository from "@/domain/repositories/ICommentRepository";
import IUserRepository from "@/domain/repositories/IUserRepository";

interface LikeCommentQuery {
    commentId: string;
    userId: string;
}

export default class LikeCommentUseCase {
    constructor(
        private readonly commentRepository: ICommentRepository,
        private readonly userRepository: IUserRepository,
        private readonly commentLikeRepository: ICommentLikeRepository,
    ) { }

    async exec({ commentId, userId }: LikeCommentQuery): Promise<void> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new UnauthorizedError("User not found");
        }
        const comment = await this.commentRepository.findById(commentId);
        if (!comment) {
            throw new NotFoundError("Comment not found");
        }
        const existingLike = await this.commentLikeRepository.findByUserIdAndCommentId(userId, commentId);
        if (existingLike) {
            await this.commentLikeRepository.delete(existingLike._id!);
        } else {
            await this.commentLikeRepository.create({
                commentId,
                userId,
            });
        }

    }
}
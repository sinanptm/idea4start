import IComment from "@/domain/entities/IComment";
import ICommentRepository from "@/domain/repositories/IComment";

interface LikeCommentQuery {
    commentId: string;
    userId: string;
    ideaId: string;
}

export default class LikeCommentUseCase {
    constructor(private readonly commentRepository: ICommentRepository) { }

    async exec({ commentId, userId, ideaId }: LikeCommentQuery): Promise<IComment> {
        return {} as IComment;
    }
}
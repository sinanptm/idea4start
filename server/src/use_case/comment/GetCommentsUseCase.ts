import { NotFoundError } from "@/domain/entities/CustomError";
import ICommentRepository, { CommentWithUser } from "@/domain/repositories/ICommentRepository";


export default class GetCommentsUseCase {
    constructor(
        private readonly commentRepository: ICommentRepository,
    ) { }

    async exec(ideaId: string): Promise<CommentWithUser[]> {
        const comments = await this.commentRepository.getCommentsByIdeaId(ideaId);
        return comments;
    }
}   
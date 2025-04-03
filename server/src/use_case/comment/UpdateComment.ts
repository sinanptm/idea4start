import IComment from "@/domain/entities/IComment";
import ICommentRepository from "@/domain/repositories/IComment";

interface UpdateCommentQuery {
    commentId: string;
    content: string;
    userId: string;
    ideaId: string;
}

export default class UpdateCommentUseCase {
    constructor(private readonly commentRepository: ICommentRepository) { }

    async exec(query: UpdateCommentQuery): Promise<IComment> {
        return {} as IComment;
    }
}   
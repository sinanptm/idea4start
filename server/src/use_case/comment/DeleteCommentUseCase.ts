import { ICommentRepository } from "@/domain/repositories/IComment";

interface DeleteCommentQuery {
    commentId: string;
    userId: string;
    ideaId: string;
}

export default class DeleteCommentUseCase {
    constructor(private readonly commentRepository: ICommentRepository) { }

    async exec(query: DeleteCommentQuery): Promise<void> {
        return;
    }
}   
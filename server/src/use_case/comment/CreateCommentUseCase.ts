import ICommentRepository from "@/domain/repositories/IComment";
import IComment from "@/domain/entities/IComment";

interface CreateCommentQuery {
    ideaId: string;
    content: string;
    userId: string;
}

export default class CreateCommentUseCase {
    constructor(private readonly commentRepository: ICommentRepository) { }

    async exec(query: CreateCommentQuery): Promise<IComment> {
        return {} as IComment;
    }
}
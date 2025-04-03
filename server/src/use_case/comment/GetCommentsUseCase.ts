import ICommentRepository from "@/domain/repositories/IComment";
import IComment from "@/domain/entities/IComment";

export default class GetCommentsUseCase {
    constructor(private readonly commentRepository: ICommentRepository) { }

    async exec(ideaId: string): Promise<IComment[]> {
        return [];
    }
}   
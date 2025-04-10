import ICommentLikeRepository from "@/domain/repositories/ICommentLikeRepository";
import ICommentLike from "@/domain/entities/ICommentLike";
import CommentLike from "@/infrastructure/models/CommentLike";

export default class CommentLikeRepository implements ICommentLikeRepository {
    commentLikeModel = CommentLike;
    async findByUserIdAndCommentId(userId: string, commentId: string): Promise<ICommentLike | null> {
        return await this.commentLikeModel.findOne({ userId, commentId });
    }
    async findAll(): Promise<ICommentLike[]> {
        return await this.commentLikeModel.find();
    }
    async findById(id: string): Promise<ICommentLike | null> {
        return await this.commentLikeModel.findById(id);
    }
    async create(data: ICommentLike): Promise<ICommentLike> {
        return await this.commentLikeModel.create(data);
    }
    async update(id: string, data: ICommentLike): Promise<ICommentLike | null> {
        return await this.commentLikeModel.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id: string): Promise<void> {
        await this.commentLikeModel.findByIdAndDelete(id);
    }
}   
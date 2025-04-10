import ICommentLike from "../entities/ICommentLike";
import BaseRepository from "./BaseRepository";

export default interface ICommentLikeRepository extends BaseRepository<ICommentLike> {
    findByUserIdAndCommentId(userId: string, commentId: string): Promise<ICommentLike | null>;
}

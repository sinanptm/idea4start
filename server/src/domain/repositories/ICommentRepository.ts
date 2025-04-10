import IComment from "../entities/IComment";
import IUser from "../entities/IUser";
import ICommentLike from "../entities/ICommentLike";
import BaseRepository from "./BaseRepository";

export interface CommentWithUser extends IComment {
    user: {
        _id: IUser["_id"];
        name: IUser["name"];
        email: IUser["email"];
        image: IUser["image"];
    };
    likes: {
        _id: ICommentLike["_id"];
        userId: IUser["_id"];
    }[];
}

export default interface ICommentRepository extends BaseRepository<IComment> {
    getCommentsByIdeaId(ideaId: string): Promise<CommentWithUser[]>;
}
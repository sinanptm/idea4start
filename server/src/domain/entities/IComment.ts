import IIdea from "./IIdea";
import IUser from "./IUser";
import ICommentLike from "./ICommentLike";

interface IComment {
    _id: string;
    ideaId?: IIdea['_id'];
    userId?: IUser['_id'];
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICommentWithRelations extends IComment {
    likes?: ICommentLike[];
    user?: IUser;
}

export default IComment;
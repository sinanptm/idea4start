import IComment from "./IComment";
import IUser from "./IUser";

interface ICommentLike {
    _id: string;
    commentId?: IComment['_id'];
    userId?: IUser['_id'];
}

export default ICommentLike;
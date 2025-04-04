import IIdea from "./IIdea";
import IUser from "./IUser";

interface IVote {
    _id?: string;
    ideaId?: IIdea['_id'];
    userId?: IUser['_id'];
    type: 'up' | 'down';
}

export default IVote;
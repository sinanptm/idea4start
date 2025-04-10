import IComment from "@/domain/entities/IComment";
import ICommentRepository, { CommentWithUser } from "@/domain/repositories/ICommentRepository";
import Comment from "@/infrastructure/models/Comment";
import { Types } from "mongoose";

export default class CommentRepository implements ICommentRepository {
    commentModel = Comment;

    async getCommentsByIdeaId(ideaId: string): Promise<CommentWithUser[]> {
        const comments = await this.commentModel.aggregate([
            { $match: { ideaId: new Types.ObjectId(ideaId) } },
            {
                $lookup: {
                    from: "commentlikes",
                    localField: "_id",
                    foreignField: "commentId",
                    as: "likes"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $project: {
                    _id: 1,
                    content: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    user: {
                        _id: "$user._id",
                        name: "$user.name",
                        email: "$user.email",
                        image: "$user.image"
                    },
                    likes: {
                        $map: {
                            input: "$likes",
                            as: "like",
                            in: {
                                _id: "$$like._id",
                                userId: "$$like.userId"
                            }
                        }
                    },
                    likesCount: { $size: "$likes" }
                }
            },
            { $sort: { likesCount: -1 } }
        ]);
        console.log(comments);
        return comments;
    }
    async findAll(): Promise<IComment[]> {
        return await this.commentModel.find();
    }
    async findById(id: string): Promise<IComment | null> {
        return await this.commentModel.findById(id);
    }
    async create(data: IComment): Promise<IComment> {
        return await this.commentModel.create(data);
    }
    async update(id: string, data: IComment): Promise<IComment | null> {
        return await this.commentModel.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id: string): Promise<void> {
        await this.commentModel.findByIdAndDelete(id);
    }

}
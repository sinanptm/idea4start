import CreateCommentUseCase from "@/use_case/comment/CreateCommentUseCase";
import UpdateCommentUseCase from "@/use_case/comment/UpdateCommentUseCase";
import DeleteCommentUseCase from "@/use_case/comment/DeleteCommentUseCase";
import CreateCommentLikeUseCase from "@/use_case/comment/CreateCommentLikeUseCase";
import GetCommentsUseCase from "@/use_case/comment/GetCommentsUseCase";
import { CustomRequest, StatusCode } from "@/types";
import { NextFunction, Response } from "express";


export default class CommentController {
    constructor(
        private readonly createCommentUseCase: CreateCommentUseCase,
        private readonly updateCommentUseCase: UpdateCommentUseCase,
        private readonly deleteCommentUseCase: DeleteCommentUseCase,
        private readonly createCommentLikeUseCase: CreateCommentLikeUseCase,
        private readonly getCommentsUseCase: GetCommentsUseCase
    ) { }

    async createComment(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { ideaId } = req.params;
            const { content } = req.body;
            const userId = req.user?.id!;
            const comment = await this.createCommentUseCase.exec({ ideaId, content, userId });
            res.status(StatusCode.CREATED).json(comment);
        } catch (error) {
            next(error);
        }
    }

    async getComments(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { ideaId } = req.params;
            const comments = await this.getCommentsUseCase.exec(ideaId as string);
            res.status(StatusCode.OK).json(comments);
        } catch (error) {
            next(error);
        }
    }
    async updateComment(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { commentId, content } = req.body;
            const userId = req.user?.id!;
            const comment = await this.updateCommentUseCase.exec({ commentId, content, userId });
            res.status(StatusCode.OK).json(comment);
        } catch (error) {
            next(error);
        }
    }

    async deleteComment(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { commentId } = req.body;
            const userId = req.user?.id!;
            await this.deleteCommentUseCase.exec({ commentId, userId });
            res.status(StatusCode.NO_CONTENT).send();
        } catch (error) {
            next(error);
        }
    }

    async createCommentLike(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { commentId } = req.body;
            const userId = req.user?.id!;
            await this.createCommentLikeUseCase.exec({ commentId, userId });
            res.status(StatusCode.NO_CONTENT).send();
        } catch (error) {
            next(error);
        }
    }
}
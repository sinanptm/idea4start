import { Router } from "express";
import { ideaController, commentController, voteController } from "../di/controllers";
import { authMiddleware } from "../di/middlewares";
const router = Router();


router.get("/", ideaController.getIdeas.bind(ideaController));

router.get("/:ideaId/comment", commentController.getComments.bind(commentController));

router.use(authMiddleware.exec);
router.patch("/:ideaId/vote", voteController.createVote.bind(voteController));

router.route("/:ideaId/comment")
    .post(commentController.createComment.bind(commentController))
    .put(commentController.updateComment.bind(commentController))
    .delete(commentController.deleteComment.bind(commentController))
    .patch(commentController.createCommentLike.bind(commentController));


export default router;
import { Router } from "express";
import { suggestionController, voteController, commentController } from "../di/controllers";

const router = Router();

router.get("/suggestions", suggestionController.getSuggestions.bind(suggestionController));

router.post("/vote", voteController.createVote.bind(voteController));

router.post("/comment", commentController.createComment.bind(commentController));
router.put("/comment", commentController.updateComment.bind(commentController));
router.delete("/comment", commentController.deleteComment.bind(commentController));
router.post("/comment/like", commentController.createCommentLike.bind(commentController));


export default router;
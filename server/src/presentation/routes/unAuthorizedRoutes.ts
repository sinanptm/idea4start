import { Router } from "express";
import { ideaController, commentController } from "../di/controllers";

const router = Router();


// idea routes
router.get("/ideas", ideaController.getIdeas.bind(ideaController));
router.get("/comments", commentController.getComments.bind(commentController));

export default router;
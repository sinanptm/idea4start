import { Router } from "express";
import { ideaController, commentController, homePageController } from "../di/controllers";

const router = Router();


// idea routes
router.get("/", homePageController.getHomePageStatics.bind(homePageController));
router.get("/ideas", ideaController.getIdeas.bind(ideaController));
router.get("/comments", commentController.getComments.bind(commentController));

export default router;
import { Router } from "express";
import { ideaController } from "../di/controllers";

const router = Router();


// idea routes
router.get("/ideas", ideaController.getIdeas.bind(ideaController));


export default router;
import { Router } from "express";
import { ideaController } from "../di/controllers";

const router = Router();


router.get('/', ideaController.getIdeas.bind(ideaController));


export default router;
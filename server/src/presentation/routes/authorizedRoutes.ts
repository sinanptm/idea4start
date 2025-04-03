import { Router } from "express";
import { suggestionController } from "../di/controllers";

const router = Router();

router.get("/suggestions", suggestionController.getSuggestions.bind(suggestionController));

export default router;
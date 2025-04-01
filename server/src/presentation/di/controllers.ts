import IdeaController from "../controllers/IdeaController";
import { getIdeasUseCase } from "./useCases";

export const ideaController = new IdeaController(getIdeasUseCase);
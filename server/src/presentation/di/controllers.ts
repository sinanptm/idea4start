import IdeaController from "../controllers/IdeaController";
import SuggestionController from "../controllers/suggestionController";
import { getIdeasUseCase, getSuggestionsUseCase } from "./useCases";

export const ideaController = new IdeaController(getIdeasUseCase);
export const suggestionController = new SuggestionController(getSuggestionsUseCase);    
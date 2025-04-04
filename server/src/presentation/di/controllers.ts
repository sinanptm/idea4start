import CommentController from "../controllers/CommentController";
import IdeaController from "../controllers/IdeaController";
import SuggestionController from "../controllers/SuggestionController";
import UserController from "../controllers/UserController";
import VoteController from "../controllers/VoteController";
import { createCommentLikeUseCase, createCommentUseCase, createUserUseCase, deleteCommentUseCase, getCommentsUseCase, getIdeasUseCase, getProfileUseCase, getSuggestionsUseCase, updateCommentUseCase, updateUserUseCase, updateVoteUseCase } from "./useCases";

export const ideaController = new IdeaController(getIdeasUseCase);
export const suggestionController = new SuggestionController(getSuggestionsUseCase);
export const userController = new UserController(getProfileUseCase, updateUserUseCase, createUserUseCase);
export const voteController = new VoteController(updateVoteUseCase);
export const commentController = new CommentController(createCommentUseCase, updateCommentUseCase, deleteCommentUseCase, createCommentLikeUseCase, getCommentsUseCase);     

import { commentLikeRepository, commentRepository, ideaRepository, userRepository, voteRepository } from "./repositories";
import { geminiService } from "./services";
import GetIdeasUseCase from "@/use_case/idea/GetIdeasUseCase";
import GetSuggestionsUseCase from "@/use_case/suggestions/GetSuggestionsUseCase";
import GetProfileUseCase from "@/use_case/user/GetProfileUseCase";
import UpdateCommentUseCase from "@/use_case/comment/UpdateCommentUseCase";
import UpdateVoteUseCase from "@/use_case/vote/UpdateVoteUseCase";
import CreateCommentUseCase from "@/use_case/comment/CreateCommentUseCase";
import DeleteCommentUseCase from "@/use_case/comment/DeleteCommentUseCase";
import CreateCommentLikeUseCase from "@/use_case/comment/CreateCommentLikeUseCase";
import CreateUserUseCase from "@/use_case/user/CreateUserUseCase";
import UpdateUserUseCase from "@/use_case/user/UpdateUserUseCase";
import GetCommentsUseCase from "@/use_case/comment/GetCommentsUseCase";
import GetHomePageStaticsUseCase from "@/use_case/GetHomePageStaticsUseCase";

// ! Home Page
export const getHomePageStaticsUseCase = new GetHomePageStaticsUseCase(
    ideaRepository,
    userRepository
);

// ! Ideas
export const getIdeasUseCase = new GetIdeasUseCase(
    ideaRepository,
    voteRepository
);

// ! Suggestions
export const getSuggestionsUseCase = new GetSuggestionsUseCase(
    geminiService,
    userRepository
);

// ! User
export const getProfileUseCase = new GetProfileUseCase(
    userRepository
);
export const createUserUseCase = new CreateUserUseCase(
    userRepository
);
export const updateUserUseCase = new UpdateUserUseCase(
    userRepository
);

// ! Comments
export const getCommentsUseCase = new GetCommentsUseCase(
    commentRepository
);
export const updateCommentUseCase = new UpdateCommentUseCase(
    commentRepository,
    userRepository
);
export const createCommentUseCase = new CreateCommentUseCase(
    commentRepository,
    userRepository
);
export const deleteCommentUseCase = new DeleteCommentUseCase(
    commentRepository,
    userRepository
);
// ! Comment Likes
export const createCommentLikeUseCase = new CreateCommentLikeUseCase(
    commentRepository,
    userRepository,
    commentLikeRepository
);

// ! Votes
export const updateVoteUseCase = new UpdateVoteUseCase(
    voteRepository,
    userRepository
);

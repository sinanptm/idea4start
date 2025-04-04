import IdeaRepository from "@/infrastructure/repositories/IdeaRepository";
import VoteRepository from "@/infrastructure/repositories/VoteRepository";
import UserRepository from "@/infrastructure/repositories/UserRepository";
import CommentRepository from "@/infrastructure/repositories/CommentRepository";
import CommentLikeRepository from "@/infrastructure/repositories/CommentLikeRepository";

export const ideaRepository = new IdeaRepository();
export const voteRepository = new VoteRepository();
export const userRepository = new UserRepository();
export const commentRepository = new CommentRepository();
export const commentLikeRepository = new CommentLikeRepository();
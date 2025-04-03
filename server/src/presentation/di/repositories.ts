import IdeaRepository from "@/infrastructure/repositories/IdeaRepository";
import VoteRepository from "@/infrastructure/repositories/VoteRepository";
import UserRepository from "@/infrastructure/repositories/UserRepository";

export const ideaRepository = new IdeaRepository();
export const voteRepository = new VoteRepository();
export const userRepository = new UserRepository();

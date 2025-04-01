import IVote from "../entities/IVote";
import { BaseRepository } from "./BaseRepository";

export interface IVoteRepository extends BaseRepository<IVote> {
    findByIdeaId(ideaId: string): Promise<IVote[]>;
}
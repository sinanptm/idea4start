import Vote from "@/infrastructure/models/Vote";
import { IVoteRepository } from "@/domain/repositories/IVoteRepository";
import IVote from "@/domain/entities/IVote";

export default class VoteRepository implements IVoteRepository {
    voteModel = Vote;
    async findAll(): Promise<IVote[]> {
        return await this.voteModel.find();
    }
    async findById(id: string): Promise<IVote | null> {
        return await this.voteModel.findById(id);
    }
    async create(data: IVote): Promise<IVote> {
        return await this.voteModel.create(data);
    }
    async update(id: string, data: IVote): Promise<IVote> {
        const vote = await this.voteModel.findByIdAndUpdate(id, data, { new: true });
        return vote as IVote;
    }
    async delete(id: string): Promise<void> {
        await this.voteModel.findByIdAndDelete(id);
    }

    async findByIdeaId(ideaId: string): Promise<IVote[]> {
        return await this.voteModel.find({ ideaId });
    }

    async findByUserId(userId: string): Promise<IVote[]> {
        return await this.voteModel.find({ userId });
    }

    async findByUserIdAndIdeaId(userId: string, ideaId: string): Promise<IVote | null> {
        return await this.voteModel.findOne({ userId, ideaId });
    }
}       
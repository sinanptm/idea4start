import { UnauthorizedError } from "@/domain/entities/CustomError";
import IUserRepository from "@/domain/repositories/IUserRepository";
import IVoteRepository from "@/domain/repositories/IVoteRepository";

interface UpdateVoteQuery {
    voteType: "up" | "down" | "neutral";
    userId: string;
    ideaId: string;
}

export default class UpdateVoteUseCase {
    constructor(
        private readonly voteRepository: IVoteRepository,
        private readonly userRepository: IUserRepository
    ) { }

    async exec(query: UpdateVoteQuery): Promise<void> {
        const { voteType, userId, ideaId } = query;
        const existingVote = await this.voteRepository.findByUserIdAndIdeaId(userId, ideaId);
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new UnauthorizedError("User not found");
        }
        if (existingVote) {
            // If the vote is neutral, delete the vote
            if (voteType === "neutral") {
                await this.voteRepository.delete(existingVote._id!);
                return;
            }
            if (existingVote.userId?.toString() !== user._id?.toString()) {
                throw new UnauthorizedError("User not authorized to update this vote");
            }
            // If the vote is not neutral, update the vote
            existingVote.type = voteType;
            await this.voteRepository.update(existingVote._id!, existingVote);
        } else {
            // If the vote is not neutral, create the vote
            if (voteType !== "neutral") {
                await this.voteRepository.create({
                    userId,
                    ideaId,
                    type: voteType as "up" | "down"
                });
            }
        }
    }

}
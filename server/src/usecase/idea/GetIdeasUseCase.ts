import IIdea from "@/domain/entities/IIdea";
import { IIdeaRepository } from "@/domain/repositories/IIdeaRepository";

interface GetIdeasQuery {
    skip: number;
    limit: number;
    sortQuery: any;
    page: number;
    searchTerms: string[];
}

export default class GetIdeasUseCase {
    constructor(
        private readonly ideaRepository: IIdeaRepository,
    ) { }

    async exec(query: GetIdeasQuery): Promise<IIdea[]> {
        return [];
    }
}
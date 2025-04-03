import GetIdeasUseCase from "@/use_case/idea/GetIdeasUseCase";
import { ideaRepository, userRepository, voteRepository } from "./repositories";
import GetSuggestionsUseCase from "@/use_case/suggestions/GetSuggestionsUseCase";
import { geminiService } from "./services";


export const getIdeasUseCase = new GetIdeasUseCase(
    ideaRepository,
    voteRepository
);

export const getSuggestionsUseCase = new GetSuggestionsUseCase(
    geminiService,
    userRepository
);
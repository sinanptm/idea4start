import GetIdeasUseCase from "@/use_case/idea/GetIdeasUseCase";
import { ideaRepository, voteRepository } from "./repositories";


export const getIdeasUseCase = new GetIdeasUseCase(
    ideaRepository,
    voteRepository
);
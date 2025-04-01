import { PipelineStage } from "mongoose";
import IIdea from "../entities/IIdea";
import { BaseRepository } from "./BaseRepository";

export interface IIdeaRepository extends BaseRepository<IIdea> {
    aggregate(pipeline: PipelineStage[]): Promise<IIdea[]>;
    countDocuments(query: Record<string, any>): Promise<number>;
}

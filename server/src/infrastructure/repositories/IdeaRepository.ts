import Idea from "@/infrastructure/models/Idea";
import { IIdeaRepository } from "@/domain/repositories/IIdeaRepository";
import IIdea from "@/domain/entities/IIdea";
import { PipelineStage } from "mongoose";

export default class IdeaRepository implements IIdeaRepository {
    ideaModel = Idea;
    async aggregate(pipeline: PipelineStage[]): Promise<IIdea[]> {
        return await this.ideaModel.aggregate(pipeline);
    }
    async countDocuments(query: Record<string, any>): Promise<number> {
        return await this.ideaModel.countDocuments(query);
    }
    async update(id: string, data: IIdea): Promise<IIdea> {
        const idea = await this.ideaModel.findByIdAndUpdate(id, data, { new: true });
        return idea as IIdea;
    }
    async delete(id: string): Promise<void> {
        await this.ideaModel.findByIdAndDelete(id);
    }

    async findAll(): Promise<IIdea[]> {
        return await this.ideaModel.find();
    }

    async findById(id: string): Promise<IIdea | null> {
        return await this.ideaModel.findById(id);
    }

    async create(idea: IIdea): Promise<IIdea> {
        return await this.ideaModel.create(idea);
    }

}           
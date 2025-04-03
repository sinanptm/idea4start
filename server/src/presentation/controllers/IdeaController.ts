import { NextFunction, Request, Response } from "express";
import GetIdeasUseCase from "@/use_case/idea/GetIdeasUseCase";
import { StatusCode } from "@/types";

export default class IdeaController {
    constructor(private readonly getIdeasUseCase: GetIdeasUseCase) { }

    async getIdeas(req: Request, res: Response, next: NextFunction) {
        try {
            const page = +(req.query.page as string || '1');
            const limit = +(req.query.limit as string || '7');
            const search = req.query.search as string;
            const businessModel = req.query.businessModel as string;
            const industry = req.query.industry as string;
            const sort = req.query.sort as string || 'relevance';
            const stage = req.query.stage as string || 'all';
            const timePeriod = req.query.timePeriod as string || 'all';

            const data = await this.getIdeasUseCase.exec({ page, limit, search, businessModel, industry, sort, stage, timePeriod, skip: 0 });

            res.status(StatusCode.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

}
import { CustomRequest, StatusCode } from "@/types";
import GetHomePageStaticsUseCase from "@/use_case/GetHomePageStaticsUseCase";
import { NextFunction, Response } from "express";

export default class HomePageController {
    constructor(
        private readonly getHomePageStaticsUseCase: GetHomePageStaticsUseCase
    ) { }

    async getHomePageStatics(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id ?? null;
            const homePageStatics = await this.getHomePageStaticsUseCase.exec({ userId });
            res.status(StatusCode.OK).json(homePageStatics);
        } catch (error) {
            next(error);
        }
    }
}
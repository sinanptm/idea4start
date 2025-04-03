import GetSuggestionsUseCase from "@/use_case/suggestions/GetSuggestionsUseCase";
import { StatusCode } from "@/types";
import { NextFunction, Request, Response } from "express";

export default class SuggestionController {
    constructor(
        private readonly getSuggestionsUseCase: GetSuggestionsUseCase
    ) { }

    async getSuggestions(req: Request, res: Response, next: NextFunction) {
        try {
            const { value, inputName, relativeFields } = req.body;
            const userId = req.user?.id;

            if (!userId) {
                return res.status(StatusCode.UNAUTHORIZED).json({ message: "User not authenticated" });
            }

            const suggestions = await this.getSuggestionsUseCase.exec({ value, inputName, relativeFields, userId });

            return res.status(StatusCode.OK).json(suggestions);
        } catch (error) {
            next(error);
        }
    }
}       
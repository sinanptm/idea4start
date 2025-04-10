import GetSuggestionsUseCase from "@/use_case/suggestions/GetSuggestionsUseCase";
import { StatusCode } from "@/types";
import { NextFunction, Response } from "express";
import { CustomRequest } from "@/types";

export default class SuggestionController {
    constructor(
        private readonly getSuggestionsUseCase: GetSuggestionsUseCase
    ) { }

    async getSuggestions(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { value, inputName, relativeFields } = req.body;
            const userId = req.user?.id;

            const suggestions = await this.getSuggestionsUseCase.exec({ value, inputName, relativeFields, userId });

            res.status(StatusCode.OK).json(suggestions);
        } catch (error) {
            next(error);
        }
    }
}       
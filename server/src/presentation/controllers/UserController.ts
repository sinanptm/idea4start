import GetProfileUseCase from "@/use_case/user/GetProfileUseCase";
import UpdateUserUseCase from "@/use_case/user/UpdateUserUseCase";
import CreateUserUseCase from "@/use_case/user/CreateUserUseCase";
import { CustomRequest, StatusCode } from "@/types";
import { NextFunction, Response } from "express";

export default class UserController {
    constructor(
        private readonly getProfileUseCase: GetProfileUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly createUserUseCase: CreateUserUseCase
    ) { }

    async getProfile(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id!;
            const profile = await this.getProfileUseCase.exec(userId);
            res.status(StatusCode.OK).json(profile);
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { name, email, image } = req.body;
            const userId = req.user?.id!;
            const user = await this.updateUserUseCase.exec({ name, email, image });
            res.status(StatusCode.OK).json(user);
        } catch (error) {
            next(error);
        }
    }

    async createUser(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { name, email, image } = req.body;
            const user = await this.createUserUseCase.exec({ name, email, image });
            res.status(StatusCode.CREATED).json(user);
        } catch (error) {
            next(error);
        }
    }

    async logout(req: CustomRequest, res: Response, next: NextFunction) {
        try {

        } catch (error) {
            next(error);
        }
    }
}       
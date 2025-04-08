import IUser from "@/domain/entities/IUser";
import IUserRepository from "@/domain/repositories/IUserRepository";
import User from "../models/User";

export default class UserRepository implements IUserRepository {
    userModel = User;

    async findAll(): Promise<IUser[]> {
        return await this.userModel.find();
    }
    async findById(id: string): Promise<IUser | null> {
        return await this.userModel.findById(id);
    }
    async create(data: IUser): Promise<IUser> {
        return await this.userModel.create(data);
    }
    async update(id: string, data: IUser): Promise<IUser> {
        const user = await this.userModel.findByIdAndUpdate(id, data, { new: true });
        return user as IUser;
    }
    async delete(id: string): Promise<void> {
        await this.userModel.findByIdAndDelete(id);
    }

    async countDocuments(query?: Record<string, any>): Promise<number> {
        return await this.userModel.countDocuments(query);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await this.userModel.findOne({ email });
    }

}   
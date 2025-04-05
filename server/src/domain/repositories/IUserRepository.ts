import IUser from "../entities/IUser";
import BaseRepository from "./BaseRepository";

export default interface IUserRepository extends BaseRepository<IUser> {
    countDocuments(query?: Record<string, any>): Promise<number>;
}

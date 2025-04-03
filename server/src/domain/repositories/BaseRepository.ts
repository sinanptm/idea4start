export default interface BaseRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    create(data: T): Promise<T>;
    update(id: string, data: T): Promise<T>;
    delete(id: string): Promise<void>;
}
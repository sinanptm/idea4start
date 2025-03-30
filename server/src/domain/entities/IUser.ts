export default interface IUser {
    _id: string;
    email: string;
    name: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
    designation?: string;
    company?: string;
    location?: string;
    bio?: string;
    website?: string;
    twitter?: string;
    buyMeACoffee?: string;
    linkedin?: string;
    github?: string;
    phoneNumber?: string;
    role?: 'user' | 'admin' | 'moderator';
    languages?: string[];
}
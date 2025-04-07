import { Request } from "express";

export enum StatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    NOT_IMPLEMENTED = 501,
}

export enum InputName {
    Title = "title",
    Description = "description",
    UniqueValue = "uniqueValue",
    ProblemStatement = "problemStatement",
    Risks = "risks",
    BusinessModel = "businessModel",
    Industries = "industries",
    Tags = "tags",
}

export type RelativeField = {
    name: InputName;
    value: string;
};

export interface CustomRequest extends Request {
    user?: {
        id: string;
        [key: string]: any;
    };
}

export enum UserRole {
    USER = "user",
    ADMIN = "admin",
}
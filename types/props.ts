import { ReactNode } from "react";
import { IVote, IIdea } from "./interface";

export type RootLayoutProps = {
    children: ReactNode;
};

export type ContainerProps = {
    children: ReactNode;
};


export type CreateIdeaModelProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export type GetIdeasProps = {
    limit?: number;
    page?: number;
    sort?: string;
    stage?: string;
    businessModel?: string;
    industry?: string;
    search?: string;
};


export type VoteProps = {
    votes: IVote[];
    ideaId: string;
};

export type IdeaCardProps = {
    idea: IIdea;
};

export type IdeaDetailHeaderProps = {
    idea: IIdea;
};

export type IdeaCommentsProps = {
    ideaId: string;
};
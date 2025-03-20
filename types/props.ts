import { ReactNode } from "react";

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
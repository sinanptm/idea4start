import { ReactNode } from "react";
import { IVote, IIdea } from "./interface";
import { FieldErrors } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { InputName, RelativeField } from "@/types";

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
    timePeriod?: string;
    search?: string;
};

export type VoteProps = {
    votes: IVote[];
    ideaId: string;
};

export type LoginDialogProps = {
    trigger?: React.ReactNode;
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

export type IdeaDetailSidebarProps = {
    idea: IIdea;
};

export type TextAreaWithSuggestionProps = {
    errors: FieldErrors<FieldValues>;
    label: string;
    name: string;
    placeholder: string;
    onChange?: (value: string) => void;
    value?: string;
    setError?: (name: string, message: string | undefined) => void;
    disabled?: boolean;
    className?: string;
    relativeFields?: RelativeField[];
};

export type ShareIdeaButtonProps = {
    link?: string;
    title?: string;
    className?: string;
};

export type GetSuggestionProps = {
    value: string;
    inputName: InputName;
    relativeFields?: RelativeField[];
};

export type ConfirmDeleteIdeaModelProps = {
    idea: IIdea;
};
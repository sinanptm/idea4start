import axios from "axios";
import { NEXT_PUBLIC_APP_URL } from "@/config";
import { InputName } from "@/types";
import { GetIdeasProps } from "@/types/props";

const instance = axios.create({
    baseURL: NEXT_PUBLIC_APP_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    timeout: 10000
});


export const getSuggestion = async (value: string, inputName: InputName, relativeFields?: { name: InputName, value: string; }[]) => {
    const response = await instance.post("/api/suggestions", { value, inputName, relativeFields });
    return response.data;
};

export const createComment = async (ideaId: string, content: string) => {
    const response = await instance.post(`/api/idea/${ideaId}/comment`, { content });
    return response.data;
};


export const createVote = async (ideaId: string, voteType: "up" | "down") => {
    const response = await instance.patch(`/api/idea/${ideaId}/like`, { voteType });
    return response.data;
};


export const deleteComment = async (ideaId: string, commentId: string) => {
    const response = await instance.delete(`/api/idea/${ideaId}/comment`, {
        data: { commentId }
    });
    return response.data;
};

export const getComments = async (ideaId: string) => {
    const response = await instance.get(`/api/idea/${ideaId}/comment`);
    return response.data;
};

export const getIdeas = async ({ limit = 10, page = 1, sort = "trending", stage = "all", businessModel = "all", industry = "all", search = "" }: GetIdeasProps) => {
    const response = await instance.get(`/api/idea`, {
        params: { limit, page, sort, stage, businessModel, industry, search }
    });
    return response.data;
};

export const likeComment = async (ideaId: string, commentId: string) => {
    const response = await instance.patch(`/api/idea/${ideaId}/comment`, { commentId });
    return response.data;
};

export const updateComment = async (ideaId: string, commentId: string, content: string) => {
    const response = await instance.put(`/api/idea/${ideaId}/comment`, { commentId, content });
    return response.data;
};

export const deleteIdea = async (ideaId: string) => {
    const response = await instance.delete(`/api/idea/${ideaId}`);
    return response.data;
};

export const getHomePageStatics = async () => {
    const response = await instance.get("/api/");
    return response.data;
};

export default instance;

import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "@/config";
import { InputName } from "@/types";
import { GetIdeasProps } from "@/types/props";
import { IUser, IVote } from "@/types/interface";

const instance = axios.create({
    baseURL: `${NEXT_PUBLIC_API_URL}/api`,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    timeout: 10000,
    withCredentials: true,
});

instance.interceptors.request.use(config => {
    const token = localStorage.getItem("user-token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export const getSuggestion = async (value: string, inputName: InputName, relativeFields?: { name: InputName, value: string; }[]) => {
    const response = await instance.post("/suggestions", { value, inputName, relativeFields });
    return response.data;
};

export const createComment = async (ideaId: string, content: string) => {
    const response = await instance.post(`/idea/${ideaId}/comment`, { content });
    return response.data;
};


export const createVote = async (ideaId: string, voteType: IVote["type"]) => {
    const response = await instance.patch(`/idea/${ideaId}/vote`, { voteType });
    return response.data;
};


export const deleteComment = async (ideaId: string, commentId: string) => {
    const response = await instance.delete(`/idea/${ideaId}/comment`, {
        data: { commentId }
    });
    return response.data;
};

export const getComments = async (ideaId: string) => {
    const response = await instance.get(`/idea/${ideaId}/comment`);
    return response.data;
};

export const getIdea = async (id: string) => {
    const response = await instance.get(`/idea/${id}`);
    return response.data;
};

export const getIdeas = async ({ limit = 10, page = 1, sort = "trending", stage = "all", businessModel = "all", industry = "all", search = "" }: GetIdeasProps) => {
    const response = await instance.get(`/idea`, {
        params: { limit, page, sort, stage, businessModel, industry, search }
    });
    return response.data;
};

export const likeComment = async (ideaId: string, commentId: string) => {
    const response = await instance.patch(`/idea/${ideaId}/comment`, { commentId });
    return response.data;
};

export const updateComment = async (ideaId: string, commentId: string, content: string) => {
    const response = await instance.put(`/idea/${ideaId}/comment`, { commentId, content });
    return response.data;
};

export const deleteIdea = async (ideaId: string) => {
    const response = await instance.delete(`/idea/${ideaId}`);
    return response.data;
};

export const getHomePageStatics = async () => {
    const response = await instance.get("/");
    return response.data;
};


export const getProfile = async () => {
    const response = await instance.get(`/profile`);
    return response.data;
};

export const updateProfile = async (data: Partial<IUser>) => {
    const response = await instance.put(`/profile`, data);
    return response.data;
};

export default instance;

import { IUser } from "@/types/interface";
import { create } from "zustand";

export interface ProfileState {
    profile: IUser | null;
    setProfile: (profile: IUser) => void;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    tab: "profile" | "ideas" | "saved";
    setTab: (tab: "profile" | "ideas" | "saved") => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    user: IUser | null;
    setUser: (user: IUser) => void;
}

const useProfile = create<ProfileState>((set) => ({
    profile: null,
    setProfile: (profile) => set({ profile }),
    isEditing: false,
    setIsEditing: (isEditing) => set({ isEditing }),
    tab: "profile",
    setTab: (tab) => set({ tab }),
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
    user: null,
    setUser: (user) => set({ user }),
}));

export default useProfile;

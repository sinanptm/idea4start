"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { memo, useEffect } from "react";
import useProfile, { ProfileState } from "@/hooks/useProfile";
import useGetProfile from "@/hooks/api/useGetProfile";
import HeaderSkeleton from "../skeleton/HeaderSkeleton";

const Header = () => {
    const isEditing = useProfile((state: ProfileState) => state.isEditing);
    const setIsEditing = useProfile((state: ProfileState) => state.setIsEditing);
    const setUser = useProfile((state: ProfileState) => state.setUser);

    const { data: user, isLoading } = useGetProfile();

    useEffect(() => {
        if (user) {
            setUser(user);
        }
    }, [user, setUser]);

    if (isLoading) {
        return <HeaderSkeleton />;
    }

    return (
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-primary/20">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-muted-foreground">{user.designation} {user.company && `at ${user.company}`}</p>
                </div>
            </div>
            <Button
                variant="outline"
                className="bg-sidebar border-yellow-300/20 hover:bg-sidebar/80 transition-all"
                onClick={() => setIsEditing(!isEditing)}
            >
                {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
        </div>
    );
};

export default memo(Header);
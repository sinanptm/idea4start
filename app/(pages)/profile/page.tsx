"use client";

import { memo } from "react";
import Container from "@/components/Container";
import Header from "@/components/profile/Header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserIdeasTab from "@/components/profile/IdeasTab";
import SavedIdeasTab from "@/components/profile/SavedIdeasTab";
import Profile from "@/components/profile/ProfileTab";

const ProfilePage = () => {
    return (
        <Container>
            <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <Header />
                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="bg-sidebar border border-yellow-300/20">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="ideas">My Ideas</TabsTrigger>
                        <TabsTrigger value="saved">Saved Ideas</TabsTrigger>
                    </TabsList>

                    <Profile />
                    <UserIdeasTab />
                    <SavedIdeasTab />

                </Tabs>
            </div>
        </Container>
    );
};

export default memo(ProfilePage);

'use client';

import { memo, useState } from "react";
import Container from "@/components/Container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IUser } from "@/types/interface";
import ProfileForm from "@/components/form/ProfileForm";
import ProfileInfo from "@/components/profile/ProfileInfo";

const ProfilePage = () => {
    // Dummy user data
    const [user, setUser] = useState<IUser>({
        _id: "user123",
        email: "john.doe@example.com",
        name: "John Doe",
        image: "/placeholder.svg?height=100&width=100",
        createdAt: new Date("2023-01-15"),
        updatedAt: new Date("2023-03-20"),
        designation: "Software Engineer",
        company: "Tech Innovations",
        location: "San Francisco, CA",
        bio: "Passionate developer with a keen interest in startups and innovative technologies. Always looking for the next big idea to transform into reality.",
        website: "https://johndoe.dev",
        twitter: "johndoe_dev",
        buyMeACoffee: "johndoe",
        linkedin: "johndoe",
        github: "johndoe",
        phoneNumber: "+1 (555) 123-4567",
        role: "user",
        languages: ["JavaScript", "TypeScript", "Python"]
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleUpdateUser = (updatedUser: Partial<IUser>) => {
        setUser(prev => ({ ...prev, ...updatedUser }));
        setIsEditing(false);
    };

    return (
        <Container>
            <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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

                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="bg-sidebar border border-yellow-300/20">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="ideas">My Ideas</TabsTrigger>
                        <TabsTrigger value="saved">Saved Ideas</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile" className="mt-6">
                        <Card className="bg-card border-gray-800">
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>
                                    Manage your personal information and preferences
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isEditing ? (
                                    <ProfileForm
                                        user={user}
                                        onSubmit={handleUpdateUser}
                                        onCancel={() => setIsEditing(false)}
                                    />
                                ) : (
                                    <ProfileInfo user={user} />
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="ideas" className="mt-6">
                        <Card className="bg-card border-gray-800">
                            <CardHeader>
                                <CardTitle>My Ideas</CardTitle>
                                <CardDescription>
                                    Ideas you've shared with the community
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8 text-muted-foreground">
                                    You haven't shared any ideas yet.
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="saved" className="mt-6">
                        <Card className="bg-card border-gray-800">
                            <CardHeader>
                                <CardTitle>Saved Ideas</CardTitle>
                                <CardDescription>
                                    Ideas you've bookmarked for later
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8 text-muted-foreground">
                                    You haven't saved any ideas yet.
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </Container>
    );
};

export default memo(ProfilePage);

"use client";

import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Card } from '../ui/card';
import { IUser } from "@/types/interface";
import ProfileForm from "../form/ProfileForm";
import ProfileInfo from "./ProfileInfo";
import useProfile, { ProfileState } from "@/hooks/useProfile";
import { TabsContent } from '../ui/tabs';
import ProfileFormSkeleton from '../skeleton/ProfileFormSkeleton';

const Profile = () => {
    const isEditing = useProfile((state: ProfileState) => state.isEditing);
    const setIsEditing = useProfile((state: ProfileState) => state.setIsEditing);
    const user = useProfile((state: ProfileState) => state.user);
    const isLoading = useProfile((state: ProfileState) => state.isLoading);

    const handleUpdateUser = (data: Partial<IUser>) => {
        console.log(data);
    };
    console.log(user);


    return (
        <TabsContent value="profile" className="mt-6">
            <Card className="bg-card border-gray-800">
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                        Manage your personal information and preferences
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <ProfileFormSkeleton />
                    ) : (
                        isEditing ? (
                            <ProfileForm
                                user={user!}
                                onSubmit={handleUpdateUser}
                                onCancel={() => setIsEditing(false)}
                            />
                        ) : (
                            <ProfileInfo user={user || {} as IUser} />
                        )
                    )}
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default Profile;
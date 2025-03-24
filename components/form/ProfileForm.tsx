"use client";

import type React from "react";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IUser } from "@/types/interface";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ProfileFormProps {
    user: IUser;
    onSubmit: (data: Partial<IUser>) => void;
    onCancel: () => void;
}

const ProfileForm = ({ user, onSubmit, onCancel }: ProfileFormProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<Partial<IUser>>({
        defaultValues: {
            name: user.name,
            designation: user.designation,
            company: user.company,
            location: user.location,
            bio: user.bio,
            website: user.website,
            twitter: user.twitter,
            buyMeACoffee: user.buyMeACoffee,
            linkedin: user.linkedin,
            github: user.github,
            phoneNumber: user.phoneNumber,
            languages: user.languages,
        },
    });

    const languages = watch("languages") || [];

    const handleAddLanguage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.currentTarget.value.trim()) {
            e.preventDefault();
            const newLanguage = e.currentTarget.value.trim();
            if (!languages.includes(newLanguage)) {
                setValue("languages", [...languages, newLanguage]);
            }
            e.currentTarget.value = "";
        }
    };

    const handleRemoveLanguage = (language: string) => {
        setValue(
            "languages",
            languages.filter((l) => l !== language),
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        {...register("name", { required: "Name is required" })}
                        className="bg-sidebar border-gray-700"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email (Read-only)</Label>
                    <Input id="email" value={user.email} disabled className="bg-sidebar border-gray-700 opacity-70" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" {...register("designation")} className="bg-sidebar border-gray-700" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" {...register("company")} className="bg-sidebar border-gray-700" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" {...register("location")} className="bg-sidebar border-gray-700" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input id="phoneNumber" {...register("phoneNumber")} className="bg-sidebar border-gray-700" />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" {...register("bio")} className="bg-sidebar border-gray-700 min-h-[100px]" />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" {...register("website")} className="bg-sidebar border-gray-700" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="github">GitHub</Label>
                        <Input id="github" {...register("github")} className="bg-sidebar border-gray-700" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter</Label>
                        <Input id="twitter" {...register("twitter")} className="bg-sidebar border-gray-700" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input id="linkedin" {...register("linkedin")} className="bg-sidebar border-gray-700" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="buyMeACoffee">Buy Me A Coffee</Label>
                        <Input id="buyMeACoffee" {...register("buyMeACoffee")} className="bg-sidebar border-gray-700" />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium">Skills & Languages</h3>
                <div className="space-y-2">
                    <Label htmlFor="newLanguage">Add Language/Skill (Press Enter to add)</Label>
                    <Input
                        id="newLanguage"
                        onKeyDown={handleAddLanguage}
                        className="bg-sidebar border-gray-700"
                        placeholder="e.g. JavaScript, Python, React"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    {languages.map((language, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1 bg-sidebar">
                            {language}
                            <button
                                type="button"
                                onClick={() => handleRemoveLanguage(language)}
                                className="ml-1 rounded-full hover:bg-gray-700 p-0.5"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" className="bg-sidebar border-yellow-300/20 hover:bg-sidebar/80 transition-all">
                    Save Changes
                </Button>
            </div>
        </form>
    );
};

export default memo(ProfileForm)


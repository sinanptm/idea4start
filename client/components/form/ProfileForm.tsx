"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import profileSchema, { ProfileInput } from "@/lib/validations/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LabeledInput } from "../ui/input";
import { LabeledTextarea } from "../ui/textarea";
import MultipleSelector from "../ui/multiselect";
import { ProfileFormProps } from "@/types/props";
import ButtonWithLoader from "../ButtonWithLoader";
import useProfile, { ProfileState } from "@/hooks/useProfile";
import { toast } from "@/hooks/useToast";
import { editProfile } from "@/app/(server)/actions";
import { LANGUAGES } from "@/constants";

const ProfileForm = ({ user }: ProfileFormProps) => {
    const setIsEditing = useProfile((state: ProfileState) => state.setIsEditing);

    const onSubmit = async (data: ProfileInput) => {
        const { success, message } = await editProfile(data);
        if (!success) {
            toast({
                title: "❌ Failed to update profile",
                description: message,
                variant: "destructive"
            });
        } else {
            toast({
                title: "✅ Profile updated successfully",
                description: message,
                variant: "success"
            });
        }
    };

    const onChangeUrl = (url: string, platform: 'linkedin' | 'github' | 'twitter' | 'buyMeACoffee') => {
        const patterns = {
            linkedin: /^(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([^/]+)/,
            github: /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^/]+)/,
            twitter: /^(?:https?:\/\/)?(?:www\.)?(?:twitter|x)\.com\/([^/]+)/,
            buyMeACoffee: /^(?:https?:\/\/)?(?:www\.)?buymeacoffee\.com\/([^/]+)/
        };

        const match = patterns[platform].exec(url);
        if (match) {
            // Return just the username if full URL provided
            setValue(platform, match[1]);
            return match[1];
        }

        // If just username provided, return as is
        if (!url.includes('https://') && !url.includes('http://')) {
            return url;
        }

        return url;
    };

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ProfileInput>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name,
            designation: user.designation,
            company: user.company,
            location: user.location,
            bio: user.bio,
            website: user.website,
            twitter: user.twitter,
            linkedin: user.linkedin,
            github: user.github,
            phoneNumber: user.phoneNumber,
            languages: user.languages,
            buyMeACoffee: user.buyMeACoffee,
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LabeledInput
                    label="Name *"
                    placeholder="Enter your name"
                    error={errors.name?.message}
                    {...register("name")}
                />

                <LabeledInput
                    label="Designation"
                    placeholder="Enter your designation"
                    error={errors.designation?.message}
                    {...register("designation")}
                />

                <LabeledInput
                    label="Company"
                    placeholder="Enter your company"
                    error={errors.company?.message}
                    {...register("company")}
                />

                <LabeledInput
                    label="Location"
                    placeholder="Enter your location"
                    error={errors.location?.message}
                    {...register("location")}
                />

                <LabeledTextarea
                    label="Bio"
                    placeholder="Enter your bio"
                    error={errors.bio?.message}
                    {...register("bio")}
                />

                <LabeledInput
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    error={errors.phoneNumber?.message}
                    {...register("phoneNumber")}
                />

            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium">Social Usernames</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <LabeledInput
                        label="Website url"
                        placeholder="Enter your website url"
                        error={errors.website?.message}
                        {...register("website")}
                    />

                    <LabeledInput
                        label="GitHub Username"
                        placeholder="Enter your GitHub username"
                        error={errors.github?.message}
                        {...register("github")}
                        onChange={(e) => onChangeUrl(e.target.value, "github")}
                    />

                    <LabeledInput
                        label="Twitter Username"
                        placeholder="Enter your Twitter username"
                        error={errors.twitter?.message}
                        {...register("twitter")}
                        onChange={(e) => onChangeUrl(e.target.value, "twitter")}
                    />

                    <LabeledInput
                        label="Buy Me A Coffee Username"
                        placeholder="Enter your Buy Me A Coffee username"
                        error={errors.buyMeACoffee?.message}
                        {...register("buyMeACoffee")}
                        onChange={(e) => onChangeUrl(e.target.value, "buyMeACoffee")}
                    />

                    <LabeledInput
                        label="LinkedIn Username"
                        placeholder="Enter your LinkedIn username"
                        error={errors.linkedin?.message}
                        {...register("linkedin")}
                        onChange={(e) => onChangeUrl(e.target.value, "linkedin")}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <MultipleSelector
                    label="Languages That You Speak"
                    options={LANGUAGES}
                    creatable
                    placeholder="Enter your languages"
                    onChange={(options) => setValue("languages", options.map((option) => option.value))}
                    value={watch("languages")?.map((language) => ({ value: language })) || []}
                />
                {errors.languages && <p className="text-red-500">{errors.languages.message}</p>}

            </div>
            <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                </Button>
                <ButtonWithLoader
                    type="submit"
                    variant={"outline"}
                    className="bg-sidebar border-yellow-300/20 hover:bg-sidebar/80 transition-all min-w-[140px]"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                >
                    Save Changes
                </ButtonWithLoader>
            </div>
        </form>
    );
};

export default memo(ProfileForm);
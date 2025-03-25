"use client";

import { memo, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import profileSchema, { ProfileInput } from "@/lib/validations/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LabeledInput } from "../ui/input";
import { LabeledTextarea } from "../ui/textarea";
import MultipleSelector from "../ui/multiselect";
import { ProfileFormProps } from "@/types/props";
import { Option } from "../ui/multiselect";
import ButtonWithLoader from "../ButtonWithLoader";
const ProfileForm = ({ user, onSubmit, onCancel }: ProfileFormProps) => {
    const [languagesOptions, setLanguagesOptions] = useState<Option[]>([]);

    const getLanguages = async () => {
        const languages = new Set<string>();
        const response = await fetch('https://restcountries.com/v3.1/all', {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'force-cache',
            next: {
                revalidate: 60 * 60 * 24 * 5, // 5 days
            },
        });
        const data = await response.json();

        data.forEach((country: any) => {
            for (let language in country.languages) {
                languages.add(country.languages[language]);
            }
        });

        const options = Array.from(languages).map(language => ({
            value: language,
        }));

        setLanguagesOptions(options); // Set state after fetch
    };

    useEffect(() => {
        getLanguages();
    }, []);

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
                <h3 className="text-lg font-medium">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <LabeledInput
                        label="Website"
                        placeholder="Enter your website"
                        error={errors.website?.message}
                        {...register("website")}
                    />

                    <LabeledInput
                        label="GitHub"
                        placeholder="Enter your GitHub"
                        error={errors.github?.message}
                        {...register("github")}
                    />

                    <LabeledInput
                        label="Twitter"
                        placeholder="Enter your Twitter"
                        error={errors.twitter?.message}
                        {...register("twitter")}
                    />

                    <LabeledInput
                        label="Buy Me A Coffee"
                        placeholder="Enter your Buy Me A Coffee"
                        error={errors.buyMeACoffee?.message}
                        {...register("buyMeACoffee")}
                    />

                </div>
            </div>

            <div className="space-y-4">
                <MultipleSelector
                    label="Languages That You Speak"
                    options={languagesOptions}
                    creatable
                    placeholder="Enter your languages"
                    onChange={(options) => setValue("languages", options.map((option) => option.value))}
                    value={watch("languages")?.map((language) => ({ value: language })) || []}
                />
                {errors.languages && <p className="text-red-500">{errors.languages.message}</p>}

            </div>
            <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="outline" onClick={onCancel}>
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
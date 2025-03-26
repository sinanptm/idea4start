import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileFormSkeleton = () => {
    return (
        <div className="space-y-6">
            {/* Personal Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name and Email */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-16" /> {/* Label */}
                    <Skeleton className="h-10 w-full" /> {/* Input */}
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" /> {/* Label */}
                    <Skeleton className="h-10 w-full" /> {/* Input */}
                </div>

                {/* Designation and Company */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" /> {/* Label */}
                    <Skeleton className="h-10 w-full" /> {/* Input */}
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" /> {/* Label */}
                    <Skeleton className="h-10 w-full" /> {/* Input */}
                </div>

                {/* Location and Phone */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" /> {/* Label */}
                    <Skeleton className="h-10 w-full" /> {/* Input */}
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-28" /> {/* Label */}
                    <Skeleton className="h-10 w-full" /> {/* Input */}
                </div>

                {/* Bio */}
                <div className="space-y-2 md:col-span-2">
                    <Skeleton className="h-4 w-12" /> {/* Label */}
                    <Skeleton className="h-[100px] w-full" /> {/* Textarea */}
                </div>
            </div>

            {/* Social Links Section */}
            <div className="space-y-4">
                <Skeleton className="h-6 w-32" /> {/* Section Title */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Website and GitHub */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" /> {/* Label */}
                        <Skeleton className="h-10 w-full" /> {/* Input */}
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" /> {/* Label */}
                        <Skeleton className="h-10 w-full" /> {/* Input */}
                    </div>

                    {/* Twitter and LinkedIn */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" /> {/* Label */}
                        <Skeleton className="h-10 w-full" /> {/* Input */}
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" /> {/* Label */}
                        <Skeleton className="h-10 w-full" /> {/* Input */}
                    </div>

                    {/* Buy Me A Coffee */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" /> {/* Label */}
                        <Skeleton className="h-10 w-full" /> {/* Input */}
                    </div>
                </div>
            </div>

            {/* Skills & Languages Section */}
            <div className="space-y-4">
                <Skeleton className="h-6 w-40" /> {/* Section Title */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-64" /> {/* Label */}
                    <Skeleton className="h-10 w-full" /> {/* Input */}
                </div>

                {/* Language Tags */}
                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} className="h-6 w-20 rounded-full" />
                    ))}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
                <Skeleton className="h-10 w-24" /> {/* Cancel Button */}
                <Skeleton className="h-10 w-32" /> {/* Save Changes Button */}
            </div>
        </div>
    );
};

export default memo(ProfileFormSkeleton);
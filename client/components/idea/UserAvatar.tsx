'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { memo, useMemo } from "react";

const UserAvatar = ({ name, url, className }: { name?: string, url?: string; className?: string; }) => {
    const initials = useMemo(() => name?.split(' ').map(n => n[0]).join('').toUpperCase(), [name]);
    const avatarUrl = url || 'https://github.com/shadcn.png';
    const fallback = initials || 'U';

    return (
        <Avatar className={cn('size-8 sm:size-10', className)}>
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
    );
};

export default memo(UserAvatar);
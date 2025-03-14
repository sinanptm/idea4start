import { cn } from '@/lib/utils';
import { GalleryVerticalEnd } from 'lucide-react';
import Link from 'next/link';
import  { memo } from 'react'

const LogoIcon = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
        <GalleryVerticalEnd aria-hidden="true" size={32} />
    </Link>
  )
}

export default memo(LogoIcon)
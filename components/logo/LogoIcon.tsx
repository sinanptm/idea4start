import { cn } from '@/lib/utils';
import Link from 'next/link';
import { memo } from 'react';
import Image from 'next/image';
import { APP_NAME } from '@/constants';

const LogoIcon = ({ className }: { className?: string; }) => {
  return (
    <Link href="/" className={cn("flex items-center gap-2 w-8 h-8", className)}>
      <Image
        src="/assets/logo.png"
        alt={`${APP_NAME} Logo`}
        width={32}
        height={32}
      />
    </Link>
  );
};

export default memo(LogoIcon);
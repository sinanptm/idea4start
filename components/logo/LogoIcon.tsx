import { cn } from '@/lib/utils';
import { memo } from 'react';
import Image from 'next/image';
import { APP_NAME } from '@/constants';

const LogoIcon = ({ className }: { className?: string; }) => {
  return (
    <span className={cn("flex items-center gap-2 w-8 h-8", className)}>
      <Image
        src="/assets/logo.png"
        alt={`${APP_NAME} Logo`}
        width={32}
        height={32}
      />
    </span>
  );
};

export default memo(LogoIcon);
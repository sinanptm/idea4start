import { memo } from 'react';
import LogoIcon from './LogoIcon';
import LogoName from './LogoName';
import Link from 'next/link';

const Logo = () => {
    return (
        <Link
            href="/"
            prefetch={true}
            className="flex items-center space-x-2"
        >
            <div className="flex aspect-square items-center justify-center rounded-lg">
                <LogoIcon className="w-8 h-8" />
            </div>
            <div className="text-left text-sm leading-tight">
                <LogoName />
            </div>
        </Link>
    );
};

export default memo(Logo);
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
            <div className="text-left text-sm leading-tight flex items-center space-x-1">
                <LogoName />
                <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold ml-1 px-2 py-0.5 rounded-full">
                    Beta
                </span>
            </div>
        </Link>
    );
};

export default memo(Logo);
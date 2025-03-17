import { memo } from 'react';
import LogoIcon from './LogoIcon';
import LogoName from './LogoName';

const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
            <div className="flex aspect-square items-center justify-center rounded-lg">
                <LogoIcon className="w-8 h-8" />
            </div>
            <div className="text-left text-sm leading-tight">
                <LogoName />
            </div>
        </div>
    );
};

export default memo(Logo);
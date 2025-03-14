import { memo } from 'react';
import LogoIcon from './Icon';
import LogoName from './Name';

const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square w-8 h-8 items-center justify-center rounded-lg">
                <LogoIcon className="w-4 h-4" />
            </div>
            <div className="text-left text-sm leading-tight">
                <LogoName />
            </div>
        </div>
    );
};

export default memo(Logo);
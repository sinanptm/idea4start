import { useMemo } from "react";

type UsePaginationProps = {
    currentPage: number;
    totalPages: number;
    paginationItemsToDisplay: number;
};

type UsePaginationReturn = {
    pages: number[];
    showLeftEllipsis: boolean;
    showRightEllipsis: boolean;
};

const usePagination = ({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
}: UsePaginationProps): UsePaginationReturn => {
    const showLeftEllipsis = currentPage - 1 > paginationItemsToDisplay / 2;
    const showRightEllipsis = totalPages - currentPage + 1 > paginationItemsToDisplay / 2;

    function calculatePaginationRange(): number[] {
        if (totalPages <= paginationItemsToDisplay) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const halfDisplay = useMemo(() => Math.floor(paginationItemsToDisplay / 2), [paginationItemsToDisplay]);
        const initialRange = useMemo(() => ({
            start: currentPage - halfDisplay,
            end: currentPage + halfDisplay,
        }), [currentPage, halfDisplay]) ;

        const adjustedRange = useMemo(() => ({
            start: Math.max(1, initialRange.start),
            end: Math.min(totalPages, initialRange.end),
        }), [initialRange, totalPages]);

        if (adjustedRange.start === 1) {
            adjustedRange.end = paginationItemsToDisplay;
        }
        if (adjustedRange.end === totalPages) {
            adjustedRange.start = totalPages - paginationItemsToDisplay + 1;
        }

        if (showLeftEllipsis) adjustedRange.start++;
        if (showRightEllipsis) adjustedRange.end--;

        return Array.from(
            { length: adjustedRange.end - adjustedRange.start + 1 },
            (_, i) => adjustedRange.start + i,
        );
    }

    const pages = useMemo(calculatePaginationRange, [currentPage, totalPages, paginationItemsToDisplay, showLeftEllipsis, showRightEllipsis]);
    
    return {
        pages,
        showLeftEllipsis,
        showRightEllipsis,
    };
};

export default usePagination;
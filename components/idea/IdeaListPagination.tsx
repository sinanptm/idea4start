import usePagination from "@/hooks/usePagination";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import useIdeasFilter from "@/hooks/useIdeasFilter";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    paginationItemsToDisplay?: number;
};

const IdeaListPagination = ({ currentPage, totalPages, paginationItemsToDisplay = 7, }: PaginationProps) => {
    const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
        currentPage,
        totalPages,
        paginationItemsToDisplay,
    });
    const { setPage } = useIdeasFilter();

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous page button */}
                <PaginationItem>
                    <PaginationPrevious
                        className="cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50"
                        onClick={() => currentPage > 1 && setPage(currentPage - 1)}
                        aria-disabled={currentPage === 1}
                    />
                </PaginationItem>

                {/* Left ellipsis (...) */}
                {showLeftEllipsis && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {/* Page number buttons */}
                {pages.map((pageNum) => (
                    <PaginationItem key={pageNum}>
                        <PaginationLink 
                            onClick={() => setPage(pageNum)}
                            isActive={pageNum === currentPage}
                            className="cursor-pointer"
                        >
                            {pageNum}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Right ellipsis (...) */}
                {showRightEllipsis && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {/* Next page button */}
                <PaginationItem>
                    <PaginationNext
                        className="cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50"
                        onClick={() => currentPage < totalPages && setPage(currentPage + 1)}
                        aria-disabled={currentPage === totalPages}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default IdeaListPagination;

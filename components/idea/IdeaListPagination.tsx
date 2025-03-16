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

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous page button */}
                <PaginationItem>
                    <PaginationPrevious
                        className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                        href={currentPage === 1 ? undefined : `/ideas?page=${currentPage - 1}`}
                        aria-disabled={currentPage === 1 ? true : undefined}
                        role={currentPage === 1 ? "link" : undefined}
                    />
                </PaginationItem>

                {/* Left ellipsis (...) */}
                {showLeftEllipsis && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {/* Page number links */}
                {pages.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink href={`/ideas?page=${page}`} isActive={page === currentPage}>
                            {page}
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
                        className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                        href={currentPage === totalPages ? undefined : `/ideas?page=${currentPage + 1}`}
                        aria-disabled={currentPage === totalPages ? true : undefined}
                        role={currentPage === totalPages ? "link" : undefined}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default IdeaListPagination;

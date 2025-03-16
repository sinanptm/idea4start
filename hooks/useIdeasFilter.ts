import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

const useIdeasFilter = () => {
    const [stage, setStage] = useQueryState("stage", parseAsString.withDefault("all"));
    const [sort, setSort] = useQueryState("sort", parseAsString.withDefault("trending"));
    const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
    const [businessModel, setBusinessModel] = useQueryState("businessModel", parseAsString);
    const [industry, setIndustry] = useQueryState("industry", parseAsString);
    const [search, setSearch] = useQueryState("search", parseAsString);

    const resetFilters = useCallback(() => {
        setStage("all");
        setSort("trending");
        setPage(1);
        setBusinessModel(null);
        setIndustry(null);
        setSearch(null);
    }, [setStage, setSort, setPage, setBusinessModel, setIndustry, setSearch]);

    const hasActiveFilters = useMemo(() => {
        return stage !== "all" ||
            sort !== "trending" ||
            businessModel !== null ||
            industry !== null ||
            search !== null;
    }, [stage, sort, businessModel, industry, search]);

    return {
        // States
        stage,
        sort,
        page,
        businessModel,
        industry,
        search,

        // Setters
        setStage,
        setSort,
        setPage,
        setBusinessModel,
        setIndustry,
        setSearch,

        // Utilities
        resetFilters,
        hasActiveFilters
    };
};

export default useIdeasFilter;

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

const useIdeasFilter = () => {
    const [stage, setStage] = useQueryState("stage", parseAsString.withDefault("all"));
    const [sort, setSort] = useQueryState("sort", parseAsString.withDefault("relevance"));
    const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
    const [businessModel, setBusinessModel] = useQueryState("businessModel", 
        parseAsString.withDefault("all"));
    const [industry, setIndustry] = useQueryState("industry", 
        parseAsString.withDefault("all"));
    const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
    const [timePeriod, setTimePeriod] = useQueryState("timePeriod", parseAsString.withDefault("all"));

    const resetFilters = useCallback(() => {
        setStage("all");
        setSort("relevance");
        setPage(1); 
        setBusinessModel("all");
        setIndustry("all");
        setSearch("");
        setTimePeriod("all");
    }, [setStage, setSort, setPage, setBusinessModel, setIndustry, setSearch, setTimePeriod]);

    const hasActiveFilters = useMemo(() => {
        return stage !== "all" ||
            sort !== "relevance" ||
            businessModel !== "all" ||
            industry !== "all" ||
            search !== "" ||
            timePeriod !== "all";
    }, [stage, sort, businessModel, industry, search, timePeriod]);

    return {
        // States
        stage,
        sort,
        page,
        businessModel,
        industry,
        search,
        timePeriod,

        // Setters
        setStage,
        setSort,
        setPage,
        setBusinessModel,
        setIndustry,
        setSearch,
        setTimePeriod,
        
        // Utilities
        resetFilters,
        hasActiveFilters
    };
};

export default useIdeasFilter;

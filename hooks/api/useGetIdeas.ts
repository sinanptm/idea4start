import { NEXT_PUBLIC_APP_URL } from "@/config";
import { IIdea, Pagination } from "@/types";
import { useQuery } from "@tanstack/react-query";

type GetIdeasProps = {
    limit?: number;
    page?: number;
    sort?: string;
    stage?: string;
    businessModel?: string;
    industry?: string;
    search?: string;
};


const getIdeas = async ({ limit = 10, page = 1, sort = "trending", stage = "all", businessModel = "all", industry = "all", search = "" }: GetIdeasProps) => {
    const res = await fetch(`${NEXT_PUBLIC_APP_URL}/api?limit=${limit}&page=${page}&sort=${sort}&stage=${stage}&businessModel=${businessModel}&industry=${industry}&search=${search}`);
    return res.json();
};

const useGetIdeas = ({ limit = 10, page = 1, sort = "trending", stage = "all", businessModel = "all", industry = "all", search = "" }: GetIdeasProps) => {
    return useQuery<{ ideas: IIdea[], pagination: Pagination }>({
        queryKey: ['ideas', limit, page, sort, stage, businessModel, industry, search],
        queryFn: async () => {
            const res = await getIdeas({ limit, page, sort, stage, businessModel, industry, search });
            return res;
        }
    });
};

export default useGetIdeas;
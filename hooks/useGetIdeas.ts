import { APP_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";

type GetIdeasProps = {
    limit?: number;
    page?: number;
}

const getIdeas = async ({ limit = 10, page = 1 }: GetIdeasProps) => {
    const res = await fetch(`${APP_URL}/api/ideas?limit=${limit}&page=${page}`);
    return res.json();
}

const useGetIdeas = ({ limit = 10, page = 1 }: GetIdeasProps) => {
    return useQuery({
        queryKey: ['ideas', limit, page],
        queryFn: async () => {
            const res = await getIdeas({ limit, page });
            return res;
        },
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 5,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    })
}

export default useGetIdeas;
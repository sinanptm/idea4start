import { useQuery } from "@tanstack/react-query";
import { getHomePageStatics } from "@/lib/api";
import { HomePageStatics } from "@/types";

const useGetHomePageStatics = () => {
    return useQuery<HomePageStatics>(
        {
            queryKey: ["homePageStatics"],
            queryFn: getHomePageStatics,
            staleTime: 1000 * 60 * 60 * 24, // 24 hours
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchInterval: false,
            refetchIntervalInBackground: false,
        }
    );
};

export default useGetHomePageStatics;

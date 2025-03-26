import { getProfile } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: () => getProfile(),
    });
};

export default useGetProfile;
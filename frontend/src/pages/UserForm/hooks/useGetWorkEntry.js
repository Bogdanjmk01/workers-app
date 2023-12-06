import { useQuery } from "@tanstack/react-query";
import { getPortfolio } from "../../../service/UserService.js";

const useGetWorkEntry = (id) => {
    const { data } = useQuery({
        queryKey: ["workEntry"],
        queryFn: () => getPortfolio(id)
    });

    return { data };
};

export default useGetWorkEntry;
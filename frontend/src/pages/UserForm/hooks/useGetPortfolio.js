import { useQuery } from "@tanstack/react-query";
import { getPortfolio } from "../../../service/UserService.js";

const useGetPortfolio = (id) => {
    const { data } = useQuery({
        queryKey: ["portfolio"],
        queryFn: () => getPortfolio(id)
    });

    return { data };
};

export default useGetPortfolio;
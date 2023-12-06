import { getAllPortfolios } from "../../../service/UserService.js";
import { useQuery }  from "@tanstack/react-query";

const useGetAllPortfolios = (id) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["portfolios"],
        queryFn: () => getAllPortfolios(id)
    });

    return { data, isLoading, isError };
};

export default useGetAllPortfolios;
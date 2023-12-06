import { Link } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import PortfolioCard from "../../components/PortfolioCard/PortfolioCard.jsx";
import useGetAllPortfolios from "./hooks/useGetAllPortfolios.js";
import Box from "@mui/material/Box";
import useDeleteWorkEntry from "../UserForm/hooks/useDeleteWorkEntry.js";

const HomePage = () => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    const { data, isLoading, isError } = useGetAllPortfolios(user.id);
    const { mutate } = useDeleteWorkEntry();

    const handleDelete = (workEntryId) => {
        mutate(workEntryId);
    };

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading data.</p>}
            <Header />
            <Box className="mt-24 mb-4">
                <Link to="/add/work" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Add work entry
                </Link>
            </Box>
            <Box className="flex sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                {data?.data.map((portfolio) => (
                    <Link key={portfolio.id} to={`/work/${portfolio.id}`}>
                        <PortfolioCard props={portfolio} onDelete={() => handleDelete(portfolio.id)} />
                    </Link>
                ))}
            </Box>
        </>
    );
};

export default HomePage;

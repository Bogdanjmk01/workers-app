import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const user = window.localStorage.getItem("user");
    return !user ? (<Outlet />) : <Navigate to="/home" />
}

export default PublicRoute

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const user = window.localStorage.getItem("user");
    return user ? (<Outlet />) : <Navigate to="/login" />
}

export default PrivateRoute

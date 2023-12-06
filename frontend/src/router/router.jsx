import { Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Login from "../pages/Login/Login.jsx";
import HomePage from "../pages/Home/HomePage.jsx";
import UserForm from "../pages/UserForm/UserForm.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<PrivateRoute />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/add/work" element={<UserForm />} />
                <Route path="/work/:id" element={<UserForm />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes

import { Navigate, Outlet } from "react-router-dom";
import { useAppData } from "../context/AppContext";

// navigate :  kis page pr navigat ekrna hai agar user authenticated nhi hai to login page pr bhej do
// Outlet : children components ko render krne ke liye use hota hai

const PublicRoute = () => {
    const {isAuth, loading} = useAppData();

    if (loading) return null;

    return isAuth ? <Navigate to="/" replace /> : <Outlet />;

};

export default PublicRoute;




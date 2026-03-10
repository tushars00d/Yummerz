// iska role ye hai ki, jab bhi hum authenticated honge, to hum login page pr nhi visit krenge dubara
// sirf prtoected pages, jo humare login ke bad ayenge unhe visit kr payenge 
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppData } from "../context/AppContext";
const ProtectedRoute = () => {
    const {isAuth, user, loading} = useAppData();

    const location = useLocation();

    if(loading) return null;

    if(!isAuth){
        return < Navigate to={"/login"} replace/>;
    }
    // role "null" hai, to select role page pr bhej do 
    if(!user?.role && location.pathname !== "/select-role"){
        return <Navigate to = {'/select-role'} replace/>;
    }

    // role "null" nahi hai, but koi role slected nahi hai, to home page pr aana hai. 
    if(user?.role && location.pathname === "/select-role"){
        return <Navigate to = {'/'} replace/>;
    }

    return <Outlet/>;
};


export default ProtectedRoute;
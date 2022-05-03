import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader } from "../../common/component";
import { useAuth } from "../hook";

export function RequireAuth(): JSX.Element {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if ( isAuthenticated === null ) {
        return <Loader/>;
    }

    if ( !isAuthenticated ) {
        return <Navigate to="/sign-in" state={{ from: location.pathname }} replace/>;
    }

    return <Outlet/>;
}

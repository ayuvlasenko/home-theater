import { ReactNode } from "react";
import { useAuth } from "../hook";
import { Navigate, useLocation } from "react-router-dom";
import { Loader } from "../../common/component";

export function RequireAuth(
    { children }: { children: ReactNode }
): JSX.Element {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if ( isAuthenticated === null ) {
        return <Loader/>;
    }

    if ( !isAuthenticated ) {
        return <Navigate to="/sign-in" state={{ from: location.pathname }} replace/>;
    }

    return <>{ children }</>;
}

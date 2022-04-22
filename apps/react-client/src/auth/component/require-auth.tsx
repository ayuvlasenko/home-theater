import { useAuth } from "../hook/use-auth";
import { Navigate, useLocation } from "react-router-dom";
import { Loader } from "../../common/component";

export function RequireAuth(
    { children }: { children: JSX.Element }
): JSX.Element {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if ( isAuthenticated === null ) {
        return <Loader/>;
    }

    if ( !isAuthenticated ) {
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    return children;
}

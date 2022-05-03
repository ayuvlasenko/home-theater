import { Navigate, Outlet } from "react-router-dom";
import { useAuth, useFromPath } from "../hook";

export function BackOnAuth(): JSX.Element {
    const fromPath = useFromPath("/");
    const { isAuthenticated } = useAuth();

    if ( isAuthenticated === true ) {
        return <Navigate to={fromPath} replace/>;
    }

    return <Outlet/>;
}

import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, useFromPath } from "../hook";

export function BackOnAuth(
    { children }: { children: ReactNode }
): JSX.Element {
    const fromPath = useFromPath("/");
    const { isAuthenticated } = useAuth();

    if ( isAuthenticated === true ) {
        return <Navigate to={fromPath} replace/>;
    }

    return <>{children}</>;
}

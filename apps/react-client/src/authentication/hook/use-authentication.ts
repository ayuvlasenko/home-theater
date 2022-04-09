import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../authentication.context";
import { AuthenticationService } from "../authentication.service";

export function useAuthentication(): {
    isAuthenticating: boolean;
    isAuthenticated: boolean;
} {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthenticationContext);
    const [isAuthenticating, setIsAuthenticating] = useState(isAuthenticated === null);

    useEffect(() => {
        if ( isAuthenticated !== null ) {
            return;
        }

        async function authenticate(): Promise<void> {
            const authenticationService = new AuthenticationService();
            const isRefreshed = await authenticationService.tryRefresh();

            setIsAuthenticated(isRefreshed);
            setIsAuthenticating(false);
        }

        void authenticate();
    }, [isAuthenticated, setIsAuthenticated]);

    return { isAuthenticating, isAuthenticated: isAuthenticated ?? false };
}

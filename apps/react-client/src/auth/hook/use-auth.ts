import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth.context";
import { AuthService } from "../auth.service";

export function useAuth(): {
    isAuthenticating: boolean;
    isAuthenticated: boolean;
} {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [isAuthenticating, setIsAuthenticating] = useState(isAuthenticated === null);

    useEffect(() => {
        if ( isAuthenticated !== null ) {
            return;
        }

        async function authenticate(): Promise<void> {
            const authenticationService = new AuthService();
            const isRefreshed = await authenticationService.tryRefresh();

            setIsAuthenticated(isRefreshed);
            setIsAuthenticating(false);
        }

        void authenticate();
    }, [isAuthenticated, setIsAuthenticated]);

    return { isAuthenticating, isAuthenticated: isAuthenticated ?? false };
}

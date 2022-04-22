import { useContext, useEffect } from "react";
import { AuthContext, AuthContextType } from "../auth.context";

export function useAuth(): Omit<AuthContextType, "refresh"> {
    const { isAuthenticated, signIn, signOut, refresh } = useContext(AuthContext);

    useEffect(() => {
        if ( isAuthenticated !== null ) {
            return;
        }

        refresh();
    }, [isAuthenticated, refresh]);

    return { isAuthenticated, signIn, signOut };
}

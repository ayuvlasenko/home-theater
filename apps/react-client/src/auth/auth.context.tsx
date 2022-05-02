import { useState, createContext, ReactNode } from "react";
import * as AuthService from "./auth.service";

export interface AuthContextType {
    isAuthenticated: boolean | null;
    signIn: (options: AuthService.SingInOptions) => void;
    signUp: (options: AuthService.SignUpOptions) => void;
    refresh: () => void;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: null,
    signIn: () => {},
    signUp: () => {},
    refresh: () => {},
    signOut: () => {},
});

export function AuthenticationProvider(
    { children }: { children: ReactNode }
): JSX.Element {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    async function signIn(options: {
        login: string;
        password: string;
    }): Promise<void> {
        const isSignedIn = await AuthService.signIn(options);
        setIsAuthenticated(isSignedIn);
    }

    async function signUp(options: {
        name: string;
        login: string;
        password: string;
    }): Promise<void> {
        const isSignedUp = await AuthService.signUp(options);
        setIsAuthenticated(isSignedUp);
    }

    async function refresh(): Promise<void> {
        const isRefreshed = await AuthService.refresh();
        setIsAuthenticated(isRefreshed);
    }

    function signOut(): void {
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            signIn: (options) => void signIn(options),
            signUp: (options) => void signUp(options),
            refresh: () => void refresh(),
            signOut,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

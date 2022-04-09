import {
    useState,
    createContext,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";

type IsAuthenticated = boolean | null;
type SetIsAuthenticated = Dispatch<SetStateAction<IsAuthenticated>>;

const initialIsAuthenticated = null as IsAuthenticated;
const initialSetIsAuthenticated: SetIsAuthenticated = () => initialIsAuthenticated;

export const AuthenticationContext = createContext({
    isAuthenticated: initialIsAuthenticated,
    setIsAuthenticated: initialSetIsAuthenticated,
});

export function AuthenticationProvider(
    { children }: { children: ReactNode }
): JSX.Element {
    const [isAuthenticated, setIsAuthenticated] = useState<IsAuthenticated>(null);

    return (
        <AuthenticationContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthenticationContext.Provider>
    );
}

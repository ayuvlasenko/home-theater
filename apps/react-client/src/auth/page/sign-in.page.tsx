import { Location, Navigate, useLocation } from "react-router-dom";
import {
    ChangeEventHandler,
    FormEventHandler,
    useState,
} from "react";
import { useAuth } from "../hook/use-auth";

export function SignInPage(): JSX.Element {
    const location = useLocation();
    const { isAuthenticated, signIn } = useAuth();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    if ( isAuthenticated === true ) {
        const from = extractPathname(location);
        return <Navigate to={from} replace />;
    }

    const handleLoginChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setLogin(e.target.value);
    };
    const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        signIn({ login, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="login">Login:</label>
            <input
                type="text"
                id="login"
                name="login"
                value={login}
                onChange={handleLoginChange}
            />
            <br/>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
            />
            <br/>
            <input type="submit" value="sign in"/>
        </form>
    );
}

const extractPathname = (location: Location) => {
    const locationState = location.state;
    if (
        !isObject(locationState)
        || !isObject(locationState.from)
        || typeof locationState.from.pathname !== "string"
    ) {
        return "/";
    }

    return locationState.from.pathname;
};

function isObject(some: unknown): some is { [key: string]: unknown } {
    return typeof some === "object" && some !== null && !Array.isArray(some);
}

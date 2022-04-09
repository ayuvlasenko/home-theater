import { ChangeEventHandler, useContext, useState } from "react";
import { AuthenticationService } from "../authentication.service";
import { AuthenticationContext } from "../authentication.context";

export function Login(): JSX.Element {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthenticationContext);
    const [authData, setAuthData] = useState({
        login: "aleksandr",
        password: "somesome",
    });
    const authenticationService = new AuthenticationService();

    const handleLoginChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setAuthData({
            ...authData,
            login: e.currentTarget.value,
        });
    };
    const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setAuthData({
            ...authData,
            password: e.currentTarget.value,
        });
    };

    const login = async () => {
        await authenticationService.login(authData);
        setIsAuthenticated(null);
    };
    const handleLoginClick = () => void login();

    return (
        <div>
            <input
                type="text"
                value={authData.login}
                onChange={handleLoginChange}
            />
            <input
                type="password"
                value={authData.password}
                onChange={handlePasswordChange}
            />
            <input
                type="button"
                name="login"
                onClick={handleLoginClick}
            />
            { isAuthenticated }
        </div>
    );
}

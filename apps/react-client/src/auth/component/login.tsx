import { ChangeEventHandler, useContext, useState } from "react";
import { AuthService } from "../auth.service";
import { AuthContext } from "../auth.context";

export function Login(): JSX.Element {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [authData, setAuthData] = useState({
        login: "aleksandr",
        password: "somesome",
    });
    const authService = new AuthService();

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
        await authService.login(authData);
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

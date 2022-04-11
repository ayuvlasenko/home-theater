import { useAuth } from "../auth/hook/use-auth";
import { Loader, NotFound } from "../common/component";
import { Route, Routes } from "react-router-dom";
import { Login } from "../auth/component/login";

export function Router(): JSX.Element {
    const { isAuthenticated, isAuthenticating } = useAuth();

    if ( isAuthenticating ) {
        return <Loader/>;
    }

    if ( !isAuthenticated ) {
        return (
            <Routes>
                <Route path="*" element={<Login/>}/>;
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route path="login" element={<Login/>}/>
        </Routes>
    );
}

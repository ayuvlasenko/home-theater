import { useAuthentication } from "../authentication/hook/use-authentication";
import { Loader, NotFound } from "../common/component";
import { Route, Routes } from "react-router-dom";
import { Login } from "../authentication/component/login";

export function Router(): JSX.Element {
    const { isAuthenticated, isAuthenticating } = useAuthentication();

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

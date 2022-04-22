import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "../auth/component";
import { SignInPage } from "../auth/page";
import { NotFound } from "../common/component";

export function Router(): JSX.Element {
    // todo: replace path names with variables
    return (
        <Routes>
            <Route path="*" element={
                <RequireAuth>
                    <NotFound/>
                </RequireAuth>
            }/>
            <Route path="sign-in" element={<SignInPage/>}/>
        </Routes>
    );
}

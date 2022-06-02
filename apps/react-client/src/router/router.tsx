import { Route, Routes } from "react-router-dom";
import { BackOnAuth, RequireAuth } from "../auth/component";
import { NotFound } from "../common/component";
import { SignInPage, SignUpPage } from "../auth/page";
import { VideoPage, VideosPage } from "../video/page";

export function Router(): JSX.Element {
    // todo: replace path names with variables
    return (
        <Routes>
            <Route element={<RequireAuth/>}>
                <Route path="*" element={<NotFound/>}/>
                <Route path="videos" element={<VideosPage/>}/>
                <Route path="videos/:videoId" element={<VideoPage/>}/>
            </Route>
            <Route element={<BackOnAuth/>}>
                <Route path="sign-in" element={<SignInPage/>}/>
                <Route path="sign-up" element={<SignUpPage/>}/>
            </Route>
        </Routes>
    );
}

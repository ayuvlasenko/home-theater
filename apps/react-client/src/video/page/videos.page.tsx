import { Loader } from "../../common/component";
import { useVideos } from "../hook";
import { VideoList } from "../component";

export function VideosPage(): JSX.Element {
    const { isLoading, videos } = useVideos();

    return (
        <div>
            <h1>Videos</h1>
            {isLoading ? <Loader/> : <VideoList videos={videos}/>}
        </div>
    );
}

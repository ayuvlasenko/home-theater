import { ReactEventHandler, useRef } from "react";
import { useParams } from "react-router-dom";
import { Loader, NotFound, Video } from "../../common/component";
import { useVideo } from "../hook";
import { buildStreamUrl, saveWatchHistory } from "../service";

export function VideoPage(): JSX.Element {
    const { videoId } = useParams<"videoId">();

    if ( videoId === undefined ) {
        throw new Error("wrong page url");
    }

    const previousTime = useRef(0);
    const { isLoading, video, watchHistory } = useVideo(videoId);

    if ( isLoading ) {
        return (<Loader/>);
    }

    if ( video === undefined ) {
        return (<NotFound/>);
    }

    const handleTimeUpdate: ReactEventHandler<HTMLVideoElement> = (e) => {
        const currentTime = e.currentTarget.currentTime;
        const timeDelta = currentTime - previousTime.current;

        if ( timeDelta >= 1 || timeDelta < 0 ) {
            previousTime.current = currentTime;
            void saveWatchHistory(video.id, currentTime);
        }
    };
    const handleEnded: ReactEventHandler<HTMLVideoElement> = (e) => {
        const currentTime = e.currentTarget.currentTime;
        previousTime.current = currentTime;
        void saveWatchHistory(video.id, currentTime);
    };
    const streamUrl = buildStreamUrl(video);

    return (
        <div>
            <h1>{video.name}</h1>
            <Video
                src={streamUrl}
                currentTime={watchHistory?.currentTimeSeconds}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
            />
        </div>
    );
}

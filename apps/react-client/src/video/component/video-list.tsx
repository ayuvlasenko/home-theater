import { Video } from "../entity";
import { VideoItem } from "./video-item";

interface VideoListProps {
    videos: Video[];
}

export function VideoList({ videos }: VideoListProps): JSX.Element {
    const videoItems = videos.map((video) => (
        <VideoItem key={video.id} video={video}/>
    ));

    return (<div>{videoItems}</div>);
}

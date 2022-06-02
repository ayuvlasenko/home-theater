import { Link } from "react-router-dom";
import { Video } from "../entity";

interface VideoItemProps {
    video: Video;
}

export function VideoItem({ video }: VideoItemProps): JSX.Element {
    return (
        <div>
            <div>{video.name}</div>
            <Link to={video.id}>View</Link>
        </div>
    );
}

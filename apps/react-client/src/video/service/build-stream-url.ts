import { Video } from "../entity";

export function buildStreamUrl(video: Video): string {
    return `/api/videos/${video.id}/stream`;
}

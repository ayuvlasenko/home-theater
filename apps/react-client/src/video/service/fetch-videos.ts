import { Video, VideoRunType } from "../entity";

export async function fetchVideos(): Promise<Video[]> {
    const response = await fetch("/api/videos");

    if ( response.status !== 200 ) {
        return [];
    }

    try {
        const videos: unknown = await response.json();

        if ( !Array.isArray(videos) ) {
            return [];
        }

        return videos.map((video) => VideoRunType.check(video));
    }
    catch (e) {
        return [];
    }
}

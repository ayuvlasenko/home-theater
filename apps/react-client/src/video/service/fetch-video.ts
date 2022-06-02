import { Video, VideoRunType } from "../entity";

export async function fetchVideo(id: string): Promise<Video | undefined> {
    const response = await fetch(`/api/videos/${id}`);

    if ( response.status !== 200 ) {
        return;
    }

    try {
        const video: unknown = await response.json();

        return VideoRunType.check(video);
    }
    catch (e) {
        // do something
    }
}

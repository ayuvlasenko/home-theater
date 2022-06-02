import { useAsync } from "../../common/hook";
import { Video } from "../entity";
import { fetchVideos } from "../service";

interface UseVideosReturn {
    isLoading: boolean;
    videos: Video[];
}

export function useVideos(): UseVideosReturn {
    const result = useAsync(() => fetchVideos());

    if ( result.status === "fulfilled" ) {
        return {
            isLoading: false,
            videos: result.value,
        };
    }

    return {
        isLoading: true,
        videos: [],
    };
}

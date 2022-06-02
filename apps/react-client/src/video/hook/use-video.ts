import { useAsync } from "../../common/hook";
import { Video, WatchHistory } from "../entity";
import { fetchVideo, fetchWatchHistory } from "../service";

interface UseVideoReturn {
    isLoading: boolean;
    video?: Video;
    watchHistory?: WatchHistory;
}

export function useVideo(id: string): UseVideoReturn {
    const videoResult = useAsync(() => fetchVideo(id));
    const watchHistoryResult = useAsync(() => fetchWatchHistory(id));

    if (
        videoResult.status === "fulfilled"
        && watchHistoryResult.status === "fulfilled"
    ) {
        return {
            isLoading: false,
            video: videoResult.value,
            watchHistory: watchHistoryResult.value,
        };
    }

    return { isLoading: true };
}

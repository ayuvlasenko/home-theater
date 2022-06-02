import { WatchHistoryRunType, WatchHistory } from "../entity";

export async function fetchWatchHistory(
    videoId: string
): Promise<WatchHistory | undefined> {
    const response = await fetch(`/api/videos/${videoId}/watch-history`);

    if ( response.status !== 200 ) {
        return;
    }

    try {
        const watchHistory: unknown = await response.json();

        return WatchHistoryRunType.check(watchHistory);
    }
    catch (e) {
        // do something
    }
}

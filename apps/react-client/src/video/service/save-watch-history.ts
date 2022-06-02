export async function saveWatchHistory(
    videoId: string,
    currentTimeSeconds: number
): Promise<void> {
    await fetch(`/api/videos/${videoId}/watch-history`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            currentTimeSeconds,
        }),
    });
}

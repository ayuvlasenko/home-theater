import { Record, Number, Static } from "runtypes";

export const WatchHistoryRunType = Record({
    currentTimeSeconds: Number,
});

export type WatchHistory = Static<typeof WatchHistoryRunType>;

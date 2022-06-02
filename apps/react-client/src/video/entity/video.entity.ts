import { Null, Record, Static, String, Union } from "runtypes";

export const VideoRunType = Record({
    id: String,
    name: Union(String, Null),
});

export type Video = Static<typeof VideoRunType>;

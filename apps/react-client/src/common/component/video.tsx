import { ReactEventHandler, useEffect, useRef } from "react";

interface VideoProps {
    src: string;
    currentTime?: number;
    onTimeUpdate?: ReactEventHandler<HTMLVideoElement>;
    onEnded?: ReactEventHandler<HTMLVideoElement>;
}

export function Video(props: VideoProps): JSX.Element {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if ( props.currentTime === undefined ) {
            return;
        }

        if ( videoRef.current === null ) {
            throw new Error("video ref is not assigned");
        }

        videoRef.current.currentTime = props.currentTime;
    }, [videoRef.current]);

    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
                ref={videoRef}
                width="600"
                onTimeUpdate={props.onTimeUpdate}
                onEnded={props.onEnded}
                controls
            >
                <source src={props.src}/>
                This browser does not support the HTML5 video element.
            </video>
        </>
    );
}

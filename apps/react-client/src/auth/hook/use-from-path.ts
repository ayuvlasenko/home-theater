import { Location, useLocation } from "react-router-dom";

export function useFromPath(defaultPath: string): string {
    const location = useLocation();
    return extractPathname(location) ?? defaultPath;
}

const extractPathname = (location: Location): string | undefined => {
    if (
        !isObject(location.state)
        || typeof location.state.from !== "string"
    ) {
        return;
    }

    return location.state.from;
};

function isObject(some: unknown): some is { [key: string]: unknown } {
    return typeof some === "object" && some !== null && !Array.isArray(some);
}

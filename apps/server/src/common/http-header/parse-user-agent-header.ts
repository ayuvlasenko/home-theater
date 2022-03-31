export type UserAgent = "desktop" | "mobile";

const regexp = {
    mobile: new RegExp(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i),
};

export function parseUserAgentHeader(header?: string): UserAgent {
    if ( header === undefined ) {
        return "desktop";
    }

    if ( regexp.mobile.test(header) ) {
        return "mobile";
    }

    return "desktop";
}

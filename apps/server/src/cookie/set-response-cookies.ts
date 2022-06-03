import type { Response } from "express";
import { Cookie } from "./cookie.service";

export function setResponseCookies(response: Response, cookies: Cookie[]): void {
    for (const cookie of cookies) {
        response.cookie(cookie.name, cookie.value, {
            httpOnly: cookie.httpOnly,
            path: cookie.path,
            maxAge: cookie.maxAgeMs,
            sameSite: cookie.sameSite,
        });
    }
}

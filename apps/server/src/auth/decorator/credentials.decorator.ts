import type { Request } from "express";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

interface RequestWithCredentials extends Request {
    credentials?: { [property: string]: unknown };
}

export const Credentials = createParamDecorator(
    (property: string | undefined, ctx: ExecutionContext) => {
        const { credentials } = ctx.switchToHttp().getRequest<RequestWithCredentials>();

        if ( credentials === undefined ) {
            return;
        }

        if ( property === undefined ) {
            return credentials;
        }

        if ( property in credentials ) {
            return credentials[property];
        }
    }
);

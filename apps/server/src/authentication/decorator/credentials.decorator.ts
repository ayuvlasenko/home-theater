import { createParamDecorator, ExecutionContext } from "@nestjs/common";
// express import is used as type
// eslint-disable-next-line node/no-extraneous-import
import { Request } from "express";

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

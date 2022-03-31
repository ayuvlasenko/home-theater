import { Request } from "express";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import {
    parseUserAgentHeader,
    UserAgent as UserAgentType,
} from "../../common/http-header/parse-user-agent-header";

export const UserAgent = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext): UserAgentType => {
        const { headers } = ctx.switchToHttp().getRequest<Request>();

        return parseUserAgentHeader(headers["user-agent"]);
    }
);

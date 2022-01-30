import { HttpException, HttpStatus } from "@nestjs/common";

export class RangeNotSatisfiableException extends HttpException {
    constructor(message?: string) {
        super(
            message ?? "Request range not satisfiable",
            HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE
        );
    }
}

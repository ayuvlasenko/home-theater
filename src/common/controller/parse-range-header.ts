import {
    RangeNotSatisfiableException,
} from "./range-not-satisfiable.exception";

export interface HttpRange {
    start: number;
    end?: number;
}

export function parseRangeHeader(header?: string): HttpRange[] {
    if ( header === undefined || !header.startsWith("bytes=") ) {
        throw new RangeNotSatisfiableException();
    }

    const ranges = header.replace("bytes=", "").split(",")
        .map((range): HttpRange => {
            if ( !range.includes("-") ) {
                const start = parseRangePart(range);

                if ( start === undefined ) {
                    throw new RangeNotSatisfiableException();
                }

                return { start };
            }

            const [startRaw, endRaw] = range.split("-");

            const start = parseRangePart(startRaw);
            const end = parseRangePart(endRaw);

            if (
                start === undefined
                || (end !== undefined && start > end)
            ) {
                throw new RangeNotSatisfiableException();
            }

            return { start, end };
        });

    const includesNonZeroRange = ranges.some(({ start, end }) => (
        end === undefined
        || start !== end
    ));

    if ( !includesNonZeroRange ) {
        throw new RangeNotSatisfiableException();
    }

    return ranges;
}

function parseRangePart(raw?: string): number | undefined {
    if ( raw === undefined ) {
        return;
    }

    const parsed = parseInt(raw, 10);

    if ( isNaN(parsed) ) {
        return;
    }

    return parsed;
}

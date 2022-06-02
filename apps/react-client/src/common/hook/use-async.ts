import { useEffect, useState } from "react";

type UseAsyncReturn<TValue> = {
    status: "fulfilled";
    value: TValue;
} | {
    status: "pending";
} | {
    status: "rejected";
    error: unknown;
};

export function useAsync<
    TAsyncFunction extends () => Promise<any>,
    TAwaitedResult = Awaited<ReturnType<TAsyncFunction>>,
>(asyncFunction: TAsyncFunction): UseAsyncReturn<TAwaitedResult> {
    const [result, setResult] = useState<UseAsyncReturn<TAwaitedResult>>({
        status: "pending",
    });

    useEffect(() => {
        // todo: try to remove using of any
        const wrapper = async () => {
            try {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const awaitedResult = await asyncFunction();
                setResult({
                    status: "fulfilled",
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    value: awaitedResult,
                });
            }
            catch (error: unknown) {
                console.error(error);
                setResult({
                    status: "rejected",
                    error,
                });
            }
        };

        void wrapper();
    }, []);

    return result;
}

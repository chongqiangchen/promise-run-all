interface IOptions {
    groupSize?: number;
    delay?: number;
    requireSuccess?: boolean;
    onItemComplete?: (itemResult: any[], groupIndex: number) => void;
}
declare const runAll: <T, D>(array: T[], iteratorFn: (item: T, index: number, array: T[]) => () => void | Promise<D>, options?: IOptions) => Promise<(void | PromiseRejectedResult | Awaited<D> | PromiseFulfilledResult<void | Awaited<D>>)[]>;
export default runAll;

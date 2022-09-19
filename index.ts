import splitArray from 'array-utils-split';

interface IOptions {
    groupSize?: number;
    delay?: number;
    requireSuccess?: boolean;
    onItemComplete?: (itemResult: any[], groupIndex: number) => void;
}

const delay = (ms = 1000) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const noop = () => {};

const defalutOptions = {
  groupSize: 10,
  delay: 1000,
  requireSuccess: false,
  onItemComplete: noop,
};

const runAll = async <T, D>(
    array: T[],
    iteratorFn: (item: T, index: number, groupIndex: number, array: T[][]) => () => Promise<D> | void,
    options: IOptions = defalutOptions
) => {
    const group = splitArray<T>(array, options.groupSize);
    const result = [];

    for (let groupIndex = 0; groupIndex < group.length; groupIndex++) {
        const groupItem = group[groupIndex];
        const promises = [];
    
        for (let itemIndex = 0; itemIndex < groupItem.length; itemIndex++) {
            const item = groupItem[itemIndex];
            const promise = iteratorFn(item, itemIndex, groupIndex, group);
            promises.push(promise);
        }

        let itemResult: PromiseSettledResult<void | Awaited<D>>[] | (void | Awaited<D>)[] = [];
        if (options.requireSuccess) {
            itemResult = await Promise.allSettled(promises.map(p => p()));
        } else {
            itemResult = await Promise.all(promises.map(p => p()));
        }
        options.onItemComplete && options.onItemComplete(itemResult, groupIndex);
        result.push(...itemResult);

        await delay(options.delay);
    }

    return result;
}

export default runAll;
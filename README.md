## Promise Run All

#### how to use
```
    // or import
    const runAll = require('promise-run-all');

    runAll([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], (item, index) => {
        return async () => {
            return item + '-done';
        }
    }).then(console.log);
```

#### params

1. array: input array
2. iteratorFn: deal with the logic of each item, can receive `currentItem`, `currentIndex`, `all`
3. options: 

    - groupSize: split array size
        - default: 10
    - delay: each group request delay
        - default: 1000
    - requireSuccess: allSettled is true, all is false
        - default: false
    - onItemComplete: each group finish callback
        - default: noop
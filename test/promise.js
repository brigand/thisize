import test from 'tape';
import thisize from '../';
const debug = require('debug')('thisize');

test('promises', (t) => {
    t.test('map', (t) => {
        const pmap = (p, fn) => p.then((xs) => Promise.all(xs.map(fn)));
        const pmapMethod = thisize(pmap);
        t.plan(1);

        Promise.resolve([1, 2, 3])
            ::pmapMethod((x) => Promise.resolve(x*2))
            .then((xs) => {
                t.deepEqual(xs, [2, 4, 6]);
            });
    });
});


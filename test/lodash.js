import test from 'tape';
import thisize from '../';
import _ from 'lodash';
const debug = require('debug')('thisize');

test('lodash', (t) => {
    t.test('flatten', (t) => {
        const flatten = thisize(_.flatten);
        t.deepEqual(
            [1, [2], 3]::flatten(),
            [1, 2, 3]
        );

        t.deepEqual(
            [1, [2, [[3]], 4]]::flatten(true),
            [1, 2, 3, 4]
        );


        t.end();
    });
});


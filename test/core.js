import test from 'tape';
import thisize from '../';
const debug = require('debug')('thisize');

const numbers = [
    0x10,
    0x20,
    0x30,
    0x40,
    0x50,
    0x60
];

test('thisize', (t) => {
    const subtract = function (a, b) {
        debug(`subtract(${a}, ${b}) of ${arguments.length} args`);
        return a - b;
    };

    const subtract5 = function (a, b, c, d, e) {
        debug(`subtract(${a}, ${b}, ${c}, ${d}, ${e}) of ${arguments.length} args`);
        return a - b - c - d -e;
    };

    t.test('defaults to argument 0 being thisArg', (t) => {
        t.equal(
            thisize(subtract).call(numbers[0], numbers[1]), 
            numbers[0] - numbers[1]
        );
        t.end();
    });

    t.test('allows specifying the argument index', (t) => {
        t.equal(
            thisize(subtract, 1).call(numbers[0], numbers[1]), 
            numbers[1] - numbers[0] 
        );
        t.end();
    });

    t.test('allows negative argument index', (t) => {
        // subtract5(2, 3, 1, 4, 5)
        t.equal(
            thisize(subtract5, -2).call(numbers[0], numbers[1], numbers[2], numbers[3], numbers[4]), 
            numbers[1] - numbers[2] - numbers[0] - numbers[3] - numbers[4] 
        );
        t.end();
    });
});


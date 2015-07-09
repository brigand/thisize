module.exports = function thisize(fn, thisArgIndex) {
    if (typeof thisArgIndex !== 'number') thisArgIndex = 0;
    var self = this;

    return function(){
        var args = [];
        for (var i=0; i<arguments.length + 1; i++) {
            if (thisArgIndex >= 0 && i === thisArgIndex) {
                args.push(this);
            } else if (thisArgIndex < 0 && i === (thisArgIndex + arguments.length - 1)) {
                args.push(this);
            }

            if (i < arguments.length) {
                args.push(arguments[i]);
            }
        }

        return fn.apply(self, args);
    }
}


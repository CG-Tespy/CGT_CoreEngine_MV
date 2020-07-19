'use strict';
var CGTIterator = /** @class */ (function () {
    function CGTIterator(iteratee) {
        this.iteratee = iteratee;
    }
    Object.defineProperty(CGTIterator.prototype, "Value", {
        get: function () { return this.value; },
        enumerable: false,
        configurable: true
    });
    return CGTIterator;
}());
export { CGTIterator };

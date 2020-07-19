var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { CGTIterator } from './CGTIterator';
var ArrayIterator = /** @class */ (function (_super) {
    __extends(ArrayIterator, _super);
    function ArrayIterator(arr) {
        var _this = _super.call(this, arr) || this;
        _this.arr = arr;
        _this.valueIndex = -1;
        return _this;
    }
    Object.defineProperty(ArrayIterator.prototype, "ValueIndex", {
        get: function () { return this.valueIndex; },
        enumerable: false,
        configurable: true
    });
    ArrayIterator.prototype.Next = function () {
        if (!this.HasNext()) {
            throw 'There is no next element for this iterator to return.';
        }
        this.valueIndex++;
        this.UpdateValue();
        return this.value;
    };
    ArrayIterator.prototype.HasNext = function () {
        return this.arr.length > 1 && this.valueIndex < this.arr.length - 1;
    };
    ArrayIterator.prototype.UpdateValue = function () {
        this.value = this.arr[this.valueIndex];
    };
    ArrayIterator.prototype.Previous = function () {
        if (!this.HasPrevious()) {
            throw 'There is no previous element for this iterator to return.';
        }
        this.valueIndex--;
        this.UpdateValue();
        return this.value;
    };
    ArrayIterator.prototype.HasPrevious = function () {
        return this.arr.length > 1 && this.valueIndex > 0;
    };
    return ArrayIterator;
}(CGTIterator));
export { ArrayIterator };

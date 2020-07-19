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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { ObjectEx } from '../Extensions/ObjectEx';
import { ArrayEx } from '../Extensions/ArrayEx';
var TightArray = /** @class */ (function (_super) {
    __extends(TightArray, _super);
    function TightArray(capacity) {
        var _this = _super.call(this, capacity) || this;
        if (ObjectEx.IsOfType(capacity, Number)) {
            _this.capacity = capacity;
            ArrayEx.Clear(_this); // To ensure this starts with nothing in it
        }
        else
            _this.capacity = _this.length * 2;
        return _this;
    }
    Object.defineProperty(TightArray.prototype, "capacity", {
        get: function () { return this._capacity; },
        set: function (value) { this._capacity = Math.max(1, value); },
        enumerable: false,
        configurable: true
    });
    TightArray.prototype.push = function () {
        var e_1, _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            for (var args_1 = __values(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
                var item = args_1_1.value;
                if (this.length == this.capacity)
                    this.shift();
                _super.prototype.push.call(this, item);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (args_1_1 && !args_1_1.done && (_a = args_1.return)) _a.call(args_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this.length;
    };
    TightArray.prototype.hasRoom = function () {
        return this.length < this.capacity;
    };
    return TightArray;
}(Array));
export { TightArray };

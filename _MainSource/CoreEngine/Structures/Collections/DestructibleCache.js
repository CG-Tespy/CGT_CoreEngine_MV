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
import { TightArray } from './TightArray';
import { ArrayEx } from '../Extensions/ArrayEx';
var DestructibleCache = /** @class */ (function () {
    function DestructibleCache(capacity) {
        capacity = capacity || 10;
        this.items = new TightArray(capacity);
        this.Capacity = capacity;
        this.AutoWipe = true;
    }
    Object.defineProperty(DestructibleCache.prototype, "Items", {
        get: function () { return this.items; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DestructibleCache.prototype, "Capacity", {
        get: function () { return this.capacity; },
        set: function (value) {
            this.capacity = value;
            this.Items.capacity = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DestructibleCache.prototype, "AutoWipe", {
        get: function () { return this.autoWipe; },
        set: function (value) { this.autoWipe = value; },
        enumerable: false,
        configurable: true
    });
    DestructibleCache.prototype.Push = function (destructible) {
        this.MakeRoomIfNecessary();
        this.Items.push(destructible);
    };
    DestructibleCache.prototype.MakeRoomIfNecessary = function () {
        if (!this.HasRoom()) {
            var removed = this.Items.shift();
            if (this.AutoWipe)
                removed.destroy();
        }
    };
    DestructibleCache.prototype.HasRoom = function () {
        return this.items.hasRoom();
    };
    DestructibleCache.prototype.Remove = function (destructible) {
        var thisHadDestructible = ArrayEx.Includes(this.Items, destructible);
        if (thisHadDestructible) {
            ArrayEx.Remove(this.Items, destructible);
            if (this.AutoWipe)
                destructible.destroy();
        }
        var removed = thisHadDestructible;
        return removed;
    };
    DestructibleCache.prototype.Clear = function () {
        if (this.AutoWipe)
            this.ClearAndWipe();
        else
            ArrayEx.Clear(this.Items);
    };
    DestructibleCache.prototype.ClearAndWipe = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.Items), _c = _b.next(); !_c.done; _c = _b.next()) {
                var destructible = _c.value;
                destructible.destroy();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        ArrayEx.Clear(this.Items);
    };
    return DestructibleCache;
}());
export { DestructibleCache };

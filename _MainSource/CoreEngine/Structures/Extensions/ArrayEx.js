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
var ArrayEx = /** @class */ (function () {
    function ArrayEx() {
    }
    ArrayEx.Remove = function (arr, toRemove) {
        var index = arr.indexOf(toRemove);
        if (index >= 0)
            arr.splice(index, 1);
    };
    ArrayEx.Copy = function (arr) {
        return arr.slice();
    };
    ArrayEx.Filter = function (arr, test, context) {
        context = context || arr; // context is optional
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            var passedTest = test.call(context, item) === true;
            if (passedTest)
                result.push(item);
        }
        return result;
    };
    ArrayEx.Clear = function (arr) {
        while (arr.length > 0)
            arr.shift();
    };
    /**
     * MV 1.5.1 doesn't support the Array.from function, so this works as a replacement.
     * @param iterable
     */
    ArrayEx.From = function (iterable) {
        var e_1, _a;
        var result = [];
        try {
            for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var element = iterable_1_1.value;
                result.push(element);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result;
    };
    ArrayEx.Includes = function (arr, item) {
        var e_2, _a;
        try {
            for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
                var element = arr_1_1.value;
                if (element === item)
                    return true;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return false;
    };
    return ArrayEx;
}());
export { ArrayEx };

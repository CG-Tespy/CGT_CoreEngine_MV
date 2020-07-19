var ObjectEx = /** @class */ (function () {
    function ObjectEx() {
    }
    ObjectEx.IsOfType = function (obj, input) {
        var inputIsFunction = typeof input === 'function';
        if (!inputIsFunction) {
            console.log("Input is not function");
            throw 'IsOfType only accepts function or class args.';
        }
        var classOfObj = obj.constructor;
        return this.IsOfExactType(obj, input) ||
            input.isPrototypeOf(classOfObj) ||
            classOfObj.isPrototypeOf(input);
    };
    ObjectEx.IsOfExactType = function (obj, input) {
        var inputIsFunction = typeof input === 'function';
        if (!inputIsFunction) {
            throw 'isOfExactType only accepts function or class args.';
        }
        return obj.constructor === input;
    };
    return ObjectEx;
}());
export { ObjectEx };

import { ArrayEx } from '../Extensions/ArrayEx';
var Event = /** @class */ (function () {
    /** Throws an exception if a negative number of args are passed. */
    function Event(argCount) {
        if (argCount === void 0) { argCount = 0; }
        this.callbacks = new Map;
        this.argCount = argCount;
        this.callbacks = new Map();
        this.invocationStr = '';
        this.funcToCall = null;
        this.callerName = 'caller';
        this.CheckIfArgCountIsValid(argCount);
        this.SetupCallbackInvocationString();
    }
    Object.defineProperty(Event.prototype, "ArgCount", {
        // Getters
        get: function () { return this.argCount; },
        enumerable: false,
        configurable: true
    });
    Event.prototype.CheckIfArgCountIsValid = function (argCount) {
        if (argCount < 0) {
            var message = 'Cannot init CGT Event with a negative arg count.';
            alert(message);
            throw message;
        }
    };
    Event.prototype.AddListener = function (func, caller) {
        if (caller === void 0) { caller = null; }
        if (this.callbacks.get(caller) == null)
            this.callbacks.set(caller, []);
        this.callbacks.get(caller).push(func);
    };
    Event.prototype.RemoveListener = function (func, caller) {
        if (caller === void 0) { caller = null; }
        if (this.callbacks.get(caller) == null)
            return;
        var callbackArr = this.callbacks.get(caller);
        ArrayEx.Remove(callbackArr, func);
    };
    /**
     * Invokes all callbacks registered under this event. Throws an exception if an inappropriate
     * number of args is passed.
     * */
    Event.prototype.Invoke = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // Safety
        if (args.length != this.ArgCount) {
            var message = "ERROR: call to Event invoke() passed wrong amount of arguments.             Amount passed: " + args.length + " Amount Needed: " + this.ArgCount;
            //alert(message);
            throw message;
        }
        // Going through the callers...
        var callers = ArrayEx.From(this.callbacks.keys());
        for (var i = 0; i < callers.length; i++) {
            var caller = callers[i];
            // Go through all the funcs registered under the caller, and execute them one by 
            // one with this object's invocation string.
            var toExecute = this.callbacks.get(caller);
            for (var i_1 = 0; i_1 < toExecute.length; i_1++) {
                this.funcToCall = toExecute[i_1];
                eval(this.invocationStr);
            }
        }
    };
    Event.prototype.SetupCallbackInvocationString = function () {
        this.invocationStr = 'this.funcToCall.call(' + this.callerName;
        if (this.ArgCount > 0)
            this.invocationStr += ', ';
        else
            this.invocationStr += ')';
        for (var i = 0; i < this.ArgCount; i++) {
            var argString = 'arguments[' + i + ']';
            if (i == this.ArgCount - 1) // Are we at the last arg?
                argString += ');';
            else
                argString += ', ';
            this.invocationStr += argString;
        }
    };
    Event.prototype.toString = function () {
        return '[object CGT.Core.Utils.Event]';
    };
    return Event;
}());
export { Event };

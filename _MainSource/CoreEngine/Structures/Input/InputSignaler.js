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
import { Event } from '../Utils/Event';
import { ArrayEx } from '../Extensions/ArrayEx';
var SignalerImplementation = /** @class */ (function () {
    function SignalerImplementation() {
        this.inputEvents = new Map();
        this.inputs = [
            'tab',
            'ok',
            'shift',
            'control',
            'escape',
            'pageup',
            'pagedown',
            'left',
            'up',
            'right',
            'down',
            'debug'
        ];
        this.inputPressed = new Event(1);
        this.inputRepeated = new Event(1);
        this.inputTriggered = new Event(1);
        this.inputLongPressed = new Event(1);
        this.InitInputEventDict();
        this.inputCheckFuncs = ArrayEx.From(this.inputEvents.keys());
    }
    Object.defineProperty(SignalerImplementation.prototype, "InputPressed", {
        get: function () { return this.inputPressed; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignalerImplementation.prototype, "InputRepeated", {
        get: function () { return this.inputRepeated; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignalerImplementation.prototype, "InputTriggered", {
        get: function () { return this.inputTriggered; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignalerImplementation.prototype, "InputLongPressed", {
        get: function () { return this.inputLongPressed; },
        enumerable: false,
        configurable: true
    });
    SignalerImplementation.prototype.InitInputEventDict = function () {
        this.inputEvents.set(Input.isPressed, this.InputPressed);
        this.inputEvents.set(Input.isRepeated, this.InputRepeated);
        this.inputEvents.set(Input.isTriggered, this.InputTriggered);
        this.inputEvents.set(Input.isLongPressed, this.InputLongPressed);
    };
    SignalerImplementation.prototype.HandleInputSignaling = function () {
        var e_1, _a, e_2, _b;
        try {
            for (var _c = __values(this.inputs), _d = _c.next(); !_d.done; _d = _c.next()) {
                var currentInput = _d.value;
                try {
                    for (var _e = (e_2 = void 0, __values(this.inputCheckFuncs)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var userEnteredInput = _f.value;
                        if (userEnteredInput.call(Input, currentInput) === true) {
                            var eventToInvoke = this.inputEvents.get(userEnteredInput);
                            eventToInvoke.Invoke(currentInput);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    return SignalerImplementation;
}());
;
export var InputSignaler = new SignalerImplementation();

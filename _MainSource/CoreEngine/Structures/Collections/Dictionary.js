import { ArrayEx } from '../Extensions/ArrayEx';
/**
 * Only here to support legacy plugins. Use Map instead when you can.
 */
var Dictionary = /** @class */ (function () {
    function Dictionary() {
        // The keys always have the same indexes as their values.
        this.keys = [];
        this.values = [];
    }
    Object.defineProperty(Dictionary.prototype, "Keys", {
        get: function () { return this.keys; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "Values", {
        get: function () { return this.values; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "Length", {
        get: function () { return this.keys.length; },
        enumerable: false,
        configurable: true
    });
    // Methods
    /**
     * Adds the passed key-value pair to this dictionary. If the key was
     * already added, the value is overwritten.
     * */
    Dictionary.prototype.Add = function (key, value) {
        if (this.HasKey(key))
            this.MapNewValueToExistingKey(value, key);
        else
            this.RegisterNewKeyValuePair(key, value);
    };
    Dictionary.prototype.MapNewValueToExistingKey = function (value, key) {
        var index = this.keys.indexOf(key);
        this.values[index] = value;
    };
    Dictionary.prototype.RegisterNewKeyValuePair = function (key, value) {
        this.keys.push(key);
        this.values.push(value);
    };
    /**
     * Removes the key (and its mapped value) from this dictionary.
     * Returns true if successful, false otherwise.
     *  */
    Dictionary.prototype.Remove = function (key) {
        if (this.HasKey(key)) {
            var index = this.keys.indexOf(key);
            this.RemoveKeyValuePairAtIndex(index);
            return true;
        }
        return false;
    };
    Dictionary.prototype.RemoveKeyValuePairAtIndex = function (index) {
        this.keys.splice(index, 1);
        this.values.splice(index, 1);
    };
    /** Returns the value mapped to the passed key, if there is one. Returns null otherwise. */
    Dictionary.prototype.Get = function (key) {
        if (this.HasKey(key)) {
            var index = this.GetKeyIndex(key);
            return this.ValueAtThatSameIndex(index);
        }
        else
            return null;
    };
    Dictionary.prototype.GetKeyIndex = function (key) {
        return this.keys.indexOf(key);
    };
    Dictionary.prototype.ValueAtThatSameIndex = function (index) {
        return this.values[index];
    };
    Dictionary.prototype.GetValueAtIndex = function (index) {
        if (this.IndexIsValid(index))
            return this.values[index];
    };
    Dictionary.prototype.IndexIsValid = function (index) {
        return index >= 0 && index < this.values.length;
    };
    Dictionary.prototype.HasKey = function (key) {
        return ArrayEx.Includes(this.keys, key);
    };
    Dictionary.prototype.HasValue = function (value) {
        return ArrayEx.Includes(this.values, value);
    };
    /** Removes all key-value pairs from this dictionary. */
    Dictionary.prototype.Clear = function () {
        this.keys = [];
        this.values = [];
    };
    return Dictionary;
}());
export { Dictionary };
;

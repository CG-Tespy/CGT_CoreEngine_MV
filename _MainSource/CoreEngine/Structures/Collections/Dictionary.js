/**
 * Only here to support legacy plugins. Use Map instead when you can.
 */
export class Dictionary {
    constructor() {
        // The keys always have the same indexes as their values.
        this.keys = [];
        this.values = [];
    }
    get Keys() { return this.keys; }
    get Values() { return this.values; }
    get Length() { return this.keys.length; }
    // Methods
    /**
     * Adds the passed key-value pair to this dictionary. If the key was
     * already added, the value is overwritten.
     * */
    Add(key, value) {
        if (this.HasKey(key))
            this.MapNewValueToExistingKey(value, key);
        else
            this.RegisterNewKeyValuePair(key, value);
    }
    MapNewValueToExistingKey(value, key) {
        let index = this.keys.indexOf(key);
        this.values[index] = value;
    }
    RegisterNewKeyValuePair(key, value) {
        this.keys.push(key);
        this.values.push(value);
    }
    /**
     * Removes the key (and its mapped value) from this dictionary.
     * Returns true if successful, false otherwise.
     *  */
    Remove(key) {
        if (this.HasKey(key)) {
            let index = this.keys.indexOf(key);
            this.RemoveKeyValuePairAtIndex(index);
            return true;
        }
        return false;
    }
    RemoveKeyValuePairAtIndex(index) {
        this.keys.splice(index, 1);
        this.values.splice(index, 1);
    }
    /** Returns the value mapped to the passed key, if there is one. Returns null otherwise. */
    Get(key) {
        if (this.HasKey(key)) {
            let index = this.GetKeyIndex(key);
            return this.ValueAtThatSameIndex(index);
        }
        else
            return null;
    }
    GetKeyIndex(key) {
        return this.keys.indexOf(key);
    }
    ValueAtThatSameIndex(index) {
        return this.values[index];
    }
    GetValueAtIndex(index) {
        if (this.IndexIsValid(index))
            return this.values[index];
    }
    IndexIsValid(index) {
        return index >= 0 && index < this.values.length;
    }
    HasKey(key) {
        return this.keys.includes(key);
    }
    HasValue(value) {
        return this.values.includes(value);
    }
    /** Removes all key-value pairs from this dictionary. */
    Clear() {
        this.keys = [];
        this.values = [];
    }
}
;

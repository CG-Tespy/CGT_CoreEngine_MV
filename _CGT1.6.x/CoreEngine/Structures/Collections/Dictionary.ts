

/**
 * Only here to support legacy plugins. Use Map instead when you can.
 */
export class Dictionary<TKey, TValue>
{
    // The keys always have the same indexes as their values.
    keys: TKey[] = [];
    get Keys() { return this.keys; }

    values: TValue[] = [];
    get Values() { return this.values; }

    get Length() { return this.keys.length; }

    // Methods

    /** 
     * Adds the passed key-value pair to this dictionary. If the key was 
     * already added, the value is overwritten. 
     * */
    Add(key: TKey, value: TValue): void
    {
        if (this.HasKey(key))
            this.MapNewValueToExistingKey(value, key);
        else
            this.RegisterNewKeyValuePair(key, value);
    }

    protected MapNewValueToExistingKey(value, key): void
    {
        let index = this.keys.indexOf(key);
        this.values[index] = value;
    }

    protected RegisterNewKeyValuePair(key, value): void
    {
        this.keys.push(key);
        this.values.push(value);
    }

    /** 
     * Removes the key (and its mapped value) from this dictionary.
     * Returns true if successful, false otherwise.
     *  */
    Remove(key: TKey): boolean
    {
        if (this.HasKey(key))
        {
            let index = this.keys.indexOf(key);
            this.RemoveKeyValuePairAtIndex(index);
            return true;
        }

        return false;
    }

    protected RemoveKeyValuePairAtIndex(index: number): void
    {
        this.keys.splice(index, 1);
        this.values.splice(index, 1);
    }

    /** Returns the value mapped to the passed key, if there is one. Returns null otherwise. */
    Get(key: TKey): TValue
    {
        if (this.HasKey(key))
        {
            let index = this.GetKeyIndex(key);
            return this.ValueAtThatSameIndex(index);
        }
        else
            return null;
    }

    protected GetKeyIndex(key: TKey): number
    {
        return this.keys.indexOf(key);
    }

    protected ValueAtThatSameIndex(index: number): TValue
    {
        return this.values[index];
    }

    protected GetValueAtIndex(index: number): TValue
    {
        if (this.IndexIsValid(index))
            return this.values[index];
    }

    protected IndexIsValid(index: number): boolean
    {
        return index >= 0 && index < this.values.length;
    }

    HasKey(key: TKey): boolean
    {
        return this.keys.includes(key);
    }

    HasValue(value: TValue): boolean
    {
        return this.values.includes(value);
    }

    /** Removes all key-value pairs from this dictionary. */
    Clear(): void
    {
        this.keys = [];
        this.values = [];
    }

};


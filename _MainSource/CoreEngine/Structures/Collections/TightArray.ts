import { ObjectEx } from '../Extensions/ObjectEx';
import { ArrayEx } from '../Extensions/ArrayEx';

export class TightArray<TValue> extends Array<TValue>
{
    _capacity: number;

    get capacity() { return this._capacity; }
    set capacity(value: number) { this._capacity = Math.max(1, value); }

    constructor(capacity: number)
    {
        super(capacity);

        if (ObjectEx.IsOfType(capacity, Number))
        {
            this.capacity = capacity;
            ArrayEx.Clear(this); // To ensure this starts with nothing in it
        }
        else
            this.capacity = this.length * 2;
    }

    push(...args: TValue[]): number
    {
        for (const item of args)
        {
            if (this.length == this.capacity)
                this.shift();

            super.push(item);
        }

        return this.length;
    }

    hasRoom(): boolean
    {
        return this.length < this.capacity;
    }

}

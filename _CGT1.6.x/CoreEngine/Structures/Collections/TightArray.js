import { ObjectEx } from '../Extensions/ObjectEx';
import { ArrayEx } from '../Extensions/ArrayEx';
export class TightArray extends Array {
    constructor(capacity) {
        super(capacity);
        if (ObjectEx.IsOfType(capacity, Number)) {
            this.capacity = capacity;
            ArrayEx.Clear(this); // To ensure this starts with nothing in it
        }
        else
            this.capacity = this.length * 2;
    }
    get capacity() { return this._capacity; }
    set capacity(value) { this._capacity = Math.max(1, value); }
    push(...args) {
        for (const item of args) {
            if (this.length == this.capacity)
                this.shift();
            super.push(item);
        }
        return this.length;
    }
    hasRoom() {
        return this.length < this.capacity;
    }
}

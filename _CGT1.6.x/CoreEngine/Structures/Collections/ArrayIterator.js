import { CGTIterator } from './CGTIterator';
export class ArrayIterator extends CGTIterator {
    constructor(arr) {
        super(arr);
        this.arr = arr;
        this.valueIndex = -1;
    }
    get ValueIndex() { return this.valueIndex; }
    Next() {
        if (!this.HasNext()) {
            throw 'There is no next element for this iterator to return.';
        }
        this.valueIndex++;
        this.UpdateValue();
        return this.value;
    }
    HasNext() {
        return this.arr.length > 1 && this.valueIndex < this.arr.length - 1;
    }
    UpdateValue() {
        this.value = this.arr[this.valueIndex];
    }
    Previous() {
        if (!this.HasPrevious()) {
            throw 'There is no previous element for this iterator to return.';
        }
        this.valueIndex--;
        this.UpdateValue();
        return this.value;
    }
    HasPrevious() {
        return this.arr.length > 1 && this.valueIndex > 0;
    }
}

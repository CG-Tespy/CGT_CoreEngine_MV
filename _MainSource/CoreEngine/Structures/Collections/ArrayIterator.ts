import { CGTIterator } from './CGTIterator';


export class ArrayIterator<TValue> extends CGTIterator<Array<TValue>, TValue>
{
    valueIndex: number = -1;
    get ValueIndex() { return this.valueIndex; }

    constructor(protected arr: Array<TValue>)
    {
        super(arr);
    }

    Next(): TValue
    {
        if (!this.HasNext())
        {
            throw 'There is no next element for this iterator to return.';
        }

        this.valueIndex++;
        this.UpdateValue();
        return this.value;
    }

    HasNext(): boolean
    {
        return this.arr.length > 1 && this.valueIndex < this.arr.length - 1;
    }

    UpdateValue(): void
    {
        this.value = this.arr[this.valueIndex];
    }

    Previous(): TValue
    {
        if (!this.HasPrevious())
        {
            throw 'There is no previous element for this iterator to return.';
        }

        this.valueIndex--;
        this.UpdateValue();
        return this.value;
    }

    HasPrevious(): boolean
    {
        return this.arr.length > 1 && this.valueIndex > 0;
    }

}

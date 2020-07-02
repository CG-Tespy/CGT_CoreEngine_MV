'use strict';

export abstract class CGTIterator<TIterable, TValue>
{
    protected value: TValue;

    get Value(): TValue { return this.value; }

    constructor(protected iteratee: TIterable) {}

    abstract Next(): TValue 

    abstract HasNext(): boolean

    abstract Previous(): TValue

    abstract HasPrevious(): boolean

}


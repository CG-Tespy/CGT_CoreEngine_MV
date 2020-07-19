import { TightArray } from './TightArray';
import { ArrayEx } from '../Extensions/ArrayEx';

interface Destructible
{
    destroy(): void;
}

export class DestructibleCache
{
    items: TightArray<Destructible>
    get Items(): TightArray<Destructible> { return this.items; }

    capacity: number;
    get Capacity() { return this.capacity; }
    set Capacity(value: number)
    { 
        this.capacity = value; 
        this.Items.capacity = value;
    }

    autoWipe: boolean;
    get AutoWipe() { return this.autoWipe; }
    set AutoWipe(value: boolean) { this.autoWipe = value; }

    constructor(capacity: number)
    {
        capacity = capacity || 10;
        this.items = new TightArray(capacity);
        this.Capacity = capacity;
        this.AutoWipe = true;
    }

    Push(destructible: Destructible): void
    {
        this.MakeRoomIfNecessary();
        this.Items.push(destructible);
    }

    protected MakeRoomIfNecessary(): void
    {
        if (!this.HasRoom())
        {
            let removed = this.Items.shift();
            if (this.AutoWipe)
                removed.destroy();
        }
    }

    HasRoom(): boolean
    {
        return this.items.hasRoom();
    }

    Remove(destructible: Destructible): boolean
    {
        let thisHadDestructible = ArrayEx.Includes(this.Items, destructible);

        if (thisHadDestructible)
        {
            ArrayEx.Remove(this.Items, destructible);
            if (this.AutoWipe)
                destructible.destroy();
        }

        let removed = thisHadDestructible;
        return removed;
    }

    Clear(): void
    {
        if (this.AutoWipe)
            this.ClearAndWipe();
        else
            ArrayEx.Clear(this.Items);
    }

    ClearAndWipe(): void
    {
        for (const destructible of this.Items)
        {
            destructible.destroy();
        }

        ArrayEx.Clear(this.Items);
    }
}


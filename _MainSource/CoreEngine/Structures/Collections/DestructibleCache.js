import { TightArray } from './TightArray';
import { ArrayEx } from '../Extensions/ArrayEx';
export class DestructibleCache {
    constructor(capacity) {
        capacity = capacity || 10;
        this.items = new TightArray(capacity);
        this.Capacity = capacity;
        this.AutoWipe = true;
    }
    get Items() { return this.items; }
    get Capacity() { return this.capacity; }
    set Capacity(value) {
        this.capacity = value;
        this.Items.capacity = value;
    }
    get AutoWipe() { return this.autoWipe; }
    set AutoWipe(value) { this.autoWipe = value; }
    Push(destructible) {
        this.MakeRoomIfNecessary();
        this.Items.push(destructible);
    }
    MakeRoomIfNecessary() {
        if (!this.HasRoom()) {
            let removed = this.Items.shift();
            if (this.AutoWipe)
                removed.destroy();
        }
    }
    HasRoom() {
        return this.items.hasRoom();
    }
    Remove(destructible) {
        let thisHadDestructible = this.Items.includes(destructible);
        if (thisHadDestructible) {
            ArrayEx.Remove(this.Items, destructible);
            if (this.AutoWipe)
                destructible.destroy();
        }
        let removed = thisHadDestructible;
        return removed;
    }
    Clear() {
        if (this.AutoWipe)
            this.ClearAndWipe();
        else
            ArrayEx.Clear(this.Items);
    }
    ClearAndWipe() {
        for (const destructible of this.Items) {
            destructible.destroy();
        }
        ArrayEx.Clear(this.Items);
    }
}

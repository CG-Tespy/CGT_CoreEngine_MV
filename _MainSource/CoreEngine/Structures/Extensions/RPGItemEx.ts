import { ArrayEx } from './ArrayEx';
import { HealEffectSet } from '../RPG/HealEffectSet';
import { Occasion } from '../RPG/Occasion';
import { DamageType } from '../RPG/DamageType';

export class RPGItemEx
{

    static UseItemOnActor(itemInInventory: RPG.Item, actor: Game_Actor): void
    {
        this.FreeUseItemOnActor(itemInInventory, actor);
        $gameParty.consumeItem(itemInInventory);
    }

    /**
     * Uses the item on the actor without consuming it.
     */
    static FreeUseItemOnActor(itemInInventory: RPG.Item, actor: Game_Actor): void
    {
        let itemUse = new Game_Action(actor, false);
        itemUse.setItemObject(itemInInventory);
        this.ApplyItemEffect(itemUse);
    }

    private static ApplyItemEffect(itemUse: Game_Action): void
    {
        let target = itemUse.subject();

        if (itemUse.isValid())
            for (let i = 0; i < itemUse.numRepeats(); i++)
                itemUse.apply(target);
        else
            throw `There is no ${itemUse.item().name} in the party's inventory.`;
    }

    static ForceUseItemOnActor(item: RPG.Item, actor: Game_Actor): void
    {
        let itemUse = new Game_Action(actor, true);
        itemUse.setItemObject(item);
        this.ApplyItemEffect(itemUse);
    }

    static HPHealingItemsIn(items: RPG.Item[]): RPG.Item[]
    {
        return ArrayEx.Filter(items, this.CanHealHP, this);
    }

    /** Returns whether the item's damage type is HP Recovery. */
    static CanHealHP(item: RPG.Item): boolean
    {
        return item.damage.type == DamageType.HPRecovery;
    }

    /** Returns whether the item's damage type is MP Recovery. */
    static CanHealMP(item: RPG.Item): boolean
    {
        return item.damage.type == DamageType.MPRecovery;
    }

    static FlatHPAmountHealed(item: RPG.Item): number
    {
        let healEffects = HealEffectSet.From(item);
        let flatAmount = 0;
        
        for (let eff of healEffects.hp)
        {
            flatAmount += eff.FlatRecovery;
        }

        return flatAmount;
    }

    static PercentHPAmountHealed(item: RPG.Item): number
    {
        let healEffects = HealEffectSet.From(item);
        let percentAmount = 0;
        
        for (let eff of healEffects.hp)
        {
            percentAmount += eff.PercentRecovery;
        }

        return percentAmount;
    }

    /*
        Returns the passed array with the use-disallowed items filtered out.
    */
    static UsablesOnly(items: RPG.Item[]): RPG.Item[]
    {
        return items.filter(this.FilterOutUnusables);
    }

    private static FilterOutUnusables(item: RPG.Item, index: number, arr: RPG.Item[])
    {
        return item.occasion != Occasion.Never;
    }

    /**
     * Returns teh passed array with the non-overworld-usable items filtered out.
     */
    static OverworldUsablesOnly(items: RPG.Item[]): RPG.Item[]
    {
        return items.filter(this.FilterOutNonOverworldUsables);
    }

    private static FilterOutNonOverworldUsables(item: RPG.Item, index: number, arr: RPG.Item[])
    {
        return item.occasion == Occasion.Always || item.occasion == Occasion.MenuOnly;
    }
    
}
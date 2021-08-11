import { GeneralSettings } from './GeneralSettings';
import { InvocationSettings } from '../InvocationSettings';
import { DamageSettings } from './DamageSettings';
import { ItemType, ItemCategory } from './Enums';
import { UseEffect } from '../UseEffect';
import { Occasion } from '../Occasion';
import { Scope } from '../Scope';
import { HitType } from '../HitType';

/**
 * A wrapper for MV's RPG.Item class
 */
export class Item
{
    get ID(): number { return this.id; }
    private id: number = -1;

    /** Notetag contents */
    get Notes(): string { return this.notes; }
    private notes: string = "";

    get General(): ItemGeneralSettings { return this.general; }
    private general: ItemGeneralSettings = new ItemGeneralSettings();

    get Damage(): DamageSettings { return this.damage; }
    private damage: DamageSettings = new DamageSettings();

    get Invocation(): InvocationSettings { return this.invocation; }
    private invocation: InvocationSettings = new InvocationSettings();

    get Effects() { return this.effects.slice(); }
    private effects: UseEffect[] = [];

    static FromBaseItem(baseItem: RPG.Item): Item
    {
        let newItem = new this();
        newItem.SetFromBaseItem(baseItem);
        return newItem;
    }

    SetFromBaseItem(baseItem: RPG.Item): void
    {
        this.General.SetFromBaseItem(baseItem);
        this.Damage.SetFromBaseItem(baseItem);
        this.Invocation.SetFromBaseItem(baseItem);
    }

}

export class ItemGeneralSettings implements GeneralSettings
{
    get Name(): string { return this.name; }
    private name: string = "";

    get Description(): string { return this.description; }
    private description: string = "";

    get IconIndex(): number { return this.iconIndex; }
    private iconIndex: number = -1;

    get Price(): number { return this.price; }
    private price: number = 0;

    get Type(): ItemType { return this.type; }
    private type: ItemType = ItemType.Regular;

    get HitType(): HitType { return this.hitType; }
    private hitType: HitType = HitType.Null;

    get Scope(): Scope { return this.scope; }
    private scope: Scope = Scope.None;

    get Occasion(): Occasion { return this.occasion; }
    private occasion: Occasion = Occasion.Never;

    get Categories(): ItemCategory[] { return this.categories; }
    private categories: ItemCategory[] = [];

    get Consumable(): boolean { return this.consumable; }
    private consumable: boolean = true;

    static FromBaseItem(baseItem: RPG.Item): ItemGeneralSettings
    {
        let newSettings = new ItemGeneralSettings();
        newSettings.SetFromBaseItem(baseItem);

        return newSettings;
    }

    SetFromBaseItem(baseItem: RPG.Item): void
    {
        this.name = baseItem.name;
        this.description = baseItem.description;
        this.iconIndex = baseItem.iconIndex;

        this.price = baseItem.price;
        this.hitType = baseItem.hitType;

        this.type = baseItem.itypeId;
        this.scope = baseItem.scope;

        this.consumable = baseItem.consumable;
    }

    static Null: Readonly<ItemGeneralSettings>;
}

ItemGeneralSettings.Null = Object.freeze(new ItemGeneralSettings());

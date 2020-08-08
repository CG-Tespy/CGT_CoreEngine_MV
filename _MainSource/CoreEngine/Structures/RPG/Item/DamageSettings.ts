import { DamageType } from './Enums';

/**
 * Holds the damage settings an Item or Skill has, as it was
 * set in the database.
 */
export class DamageSettings implements RPG.Damage
{
    get ElementID(): number { return this.elementId; }
    elementId: number = -1;
    
    get Type(): DamageType { return this.type; }
    type: DamageType = DamageType.None;

    get Formula(): string { return this.formula; }
    formula: string = "";

    get Variance(): number { return this.variance; }
    variance: number = 0;
    
    get CanCrit(): boolean { return this.critical; }
    critical: boolean = false;

    static FromBaseItem(baseItem: RPG.Item)
    {
        let newSettings = new this();
        newSettings.SetFromBaseItem(baseItem);
        return newSettings;
    }

    SetFromBaseItem(baseItem: RPG.Item): void
    {
        Object.assign(this, baseItem.damage);
    }
}


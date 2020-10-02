import { EffectType } from './EffectType';
import { ArrayEx } from '../Extensions/ArrayEx';
import { HealEffect } from './HealEffect';
import { DamageType } from './DamageType';

/**
 * Encapsulates basic healing effects involving, HP, MP, or TP
 */
export class HealEffectSet
{
    hp: HealEffect[] = [];
    mp: HealEffect[] = [];
    tp: HealEffect[] = [];

    /** Creates an instance of this from the effects of the passed item. */
    static From(dbObject: RPG.Item | RPG.Skill): HealEffectSet | Readonly<HealEffectSet>
    {
        if (!this.IsForRecovery(dbObject))
            return this.Null;

        let healEffects = new HealEffectSet();
        healEffects.RegisterMultiple(dbObject.effects);
        return healEffects;
    }

    static IsForRecovery(dbObject: RPG.Item | RPG.Skill): boolean
    {
        return dbObject.damage.type == DamageType.HPRecovery ||
        dbObject.damage.type == DamageType.MPRecovery;
    }

    /**
     * Registers any legit healing effects in the array passed. Returns true if
     * any were legit, false otherwise.
     * @param effects 
     */
    RegisterMultiple(effects: RPG.Effect[]): Boolean
    {
        for (const eff of effects)
            this.Register(eff);
        
        return this.Any();
    }

    /**
     * If the passed effect is a legit healing effect, it gets registered as the right
     * type in this instance, returning true. Returns false otherwise.
     */
    Register(eff: RPG.Effect): Boolean
    {
        if (this.IsHealingEffect(eff))
        {
            let effConverted = HealEffect.FromDBEffect(eff) as HealEffect;

            switch (eff.code)
            {
                case EffectType.HPHeal:
                    this.hp.push(effConverted);
                    break;
                case EffectType.MPHeal:
                    this.mp.push(effConverted);
                    break;
                case EffectType.TPHeal:
                    this.tp.push(effConverted);
                    break;
                default: 
                    throw Error(`Did not account for healing code ${eff.code}`);

            }

            return true;
        }

        return false;
    }

    private IsHealingEffect(effect: RPG.Effect)
    {
        let hasHealingCode = ArrayEx.Includes(HealEffectSet.Codes, effect.code);
        let percentHealValue = effect.value1;
        let flatHealValue = effect.value2;
        
        let doesAnyHealing = hasHealingCode && (percentHealValue > 0 || flatHealValue > 0);
        let doesNoDamage = hasHealingCode && !(percentHealValue < 0 || flatHealValue < 0);

        return doesAnyHealing && doesNoDamage;
    }

    private static Codes = Object.freeze
    (
        [
            EffectType.HPHeal,
            EffectType.MPHeal,
            EffectType.TPHeal
        ]
    );

    /** Whether or not this has any effects registered. */
    Any(): Boolean
    {
        return this.hp.length > 0 || this.mp.length > 0 || this.tp.length > 0;
    }

    get Length(): number { return this.hp.length + this.mp.length + this.tp.length; }
    static Null = Object.freeze(new HealEffectSet());
    
}


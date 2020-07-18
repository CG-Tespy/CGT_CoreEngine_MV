import { EffectCodes } from './EffectCodes';
export class HealEffects {
    constructor() {
        this.hp = [];
        this.mp = [];
        this.tp = [];
    }
    /** Creates an instance of this from the effects of the passed item. */
    static OfItem(item) {
        let healEffects = new HealEffects();
        healEffects.RegisterMultiple(item.effects);
        return healEffects;
    }
    /**
     * Registers any legit healing effects in the array passed. Returns true if
     * any were legit, false otherwise.
     * @param effects
     */
    RegisterMultiple(effects) {
        for (const eff of effects)
            this.Register(eff);
        return this.Any();
    }
    /**
     * If the passed effect is a legit healing effect, it gets registered as the right
     * type in this instance, returning true. Returns false otherwise.
     */
    Register(eff) {
        if (this.IsLegitHealingEffect(eff)) {
            switch (eff.code) {
                case EffectCodes.HPHeal:
                    this.hp.push(eff);
                    break;
                case EffectCodes.MPHeal:
                    this.mp.push(eff);
                    break;
                case EffectCodes.TPHeal:
                    this.tp.push(eff);
                    break;
                default:
                    throw Error(`Did not account for healing code ${eff.code}`);
            }
            return true;
        }
        return false;
    }
    IsLegitHealingEffect(effect) {
        let hasHealingCode = HealEffects.Codes.includes(effect.code);
        let percentHealValue = effect.value1;
        let flatHealValue = effect.value2;
        let doesAnyHealing = percentHealValue > 0 || flatHealValue > 0;
        let doesNoDamage = !(percentHealValue < 0 || flatHealValue < 0);
        return hasHealingCode && doesAnyHealing && doesNoDamage;
    }
    /** Whether or not this has any effects registered. */
    Any() {
        return this.hp.length > 0 || this.mp.length > 0 || this.tp.length > 0;
    }
}
HealEffects.Codes = Object.freeze([EffectCodes.HPHeal, EffectCodes.MPHeal, EffectCodes.TPHeal]);
HealEffects.Null = Object.freeze(new HealEffects());

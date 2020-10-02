import { EffectType } from "./EffectType"
import { UseEffect } from './UseEffect';
import { HealEffectSet } from './HealEffectSet';

/**
 * For effects that recover HP, MP, or TP.
 */
export class HealEffect extends UseEffect
{
    get PercentRecovery(): number { return this.value1; }
    get FlatRecovery(): number { return this.value2; }

    set PercentRecovery(value: number) { this.value1 = value; }
    set FlatRecovery(value: number) { this.value2 = value; }

    protected static validCodes = [EffectType.HPHeal, EffectType.MPHeal, EffectType.TPHeal];

    static Null: Readonly<HealEffect>;
    
}

HealEffect.Null = Object.freeze(new HealEffect());
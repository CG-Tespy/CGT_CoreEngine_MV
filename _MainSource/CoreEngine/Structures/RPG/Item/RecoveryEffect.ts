import { EffectType } from './Enums';
import { UseEffect } from './UseEffect';

/**
 * For effects that recover HP, MP, or TP.
 */
export class RecoveryEffect extends UseEffect
{
    get PercentRecovery(): number { return this.value1; }
    get FlatRecovery(): number { return this.value2; }

    set PercentRecovery(value: number) { this.value1 = value; }
    set FlatRecovery(value: number) { this.value2 = value; }

    protected static validCodes = [EffectType.HPHeal, EffectType.MPHeal, EffectType.TPGain];

    static Null: Readonly<RecoveryEffect>;
    
}

RecoveryEffect.Null = Object.freeze(new RecoveryEffect());

import { UseEffect } from '../UseEffect';
import { EffectType } from "../EffectType";

/**
 * For effects that change state, like adding or removing Poison.
 */
export class StateChangeEffect extends UseEffect
{
    get StateNumber() { return this.dataId; }

    protected static validCodes = [EffectType.AddState, EffectType.RemoveState];

    static Null: StateChangeEffect;
}

StateChangeEffect.Null = Object.freeze(new StateChangeEffect());
import { EffectType } from './Enums';
import { ArrayEx } from '../../Extensions/ArrayEx';

/**
 * Wrapper for MV's Effect class, which represents effects
 * you can set up in an Item's or Skill's effect settings.
 */
export class UseEffect implements RPG.Effect
{
    code: number;
    dataId: number;
    value1: number;
    value2: number;

    get Type(): EffectType { return this.code || EffectType.Null; }

    static FromDBEffect(dbEffect: RPG.Effect)
    {
        if (!this.EffectIsRightType(dbEffect))
            return this.Null;

        let newEffect = new this();
        Object.assign(newEffect, dbEffect);

        return newEffect;
    }

    protected static EffectIsRightType(effect: RPG.Effect)
    {
        return ArrayEx.Includes(this.validCodes, effect.code);
    }

    protected static validCodes = [];

    static Null: Readonly<UseEffect>;
    
}

UseEffect.Null = Object.freeze(new UseEffect());
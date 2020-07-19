var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { EffectCodes } from './EffectCodes';
import { ArrayEx } from '../ArrayEx';
var HealEffects = /** @class */ (function () {
    function HealEffects() {
        this.hp = [];
        this.mp = [];
        this.tp = [];
    }
    /** Creates an instance of this from the effects of the passed item. */
    HealEffects.OfItem = function (item) {
        var healEffects = new HealEffects();
        healEffects.RegisterMultiple(item.effects);
        return healEffects;
    };
    /**
     * Registers any legit healing effects in the array passed. Returns true if
     * any were legit, false otherwise.
     * @param effects
     */
    HealEffects.prototype.RegisterMultiple = function (effects) {
        var e_1, _a;
        try {
            for (var effects_1 = __values(effects), effects_1_1 = effects_1.next(); !effects_1_1.done; effects_1_1 = effects_1.next()) {
                var eff = effects_1_1.value;
                this.Register(eff);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (effects_1_1 && !effects_1_1.done && (_a = effects_1.return)) _a.call(effects_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this.Any();
    };
    /**
     * If the passed effect is a legit healing effect, it gets registered as the right
     * type in this instance, returning true. Returns false otherwise.
     */
    HealEffects.prototype.Register = function (eff) {
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
                    throw Error("Did not account for healing code " + eff.code);
            }
            return true;
        }
        return false;
    };
    HealEffects.prototype.IsLegitHealingEffect = function (effect) {
        var hasHealingCode = ArrayEx.Includes(HealEffects.Codes, effect.code);
        var percentHealValue = effect.value1;
        var flatHealValue = effect.value2;
        var doesAnyHealing = percentHealValue > 0 || flatHealValue > 0;
        var doesNoDamage = !(percentHealValue < 0 || flatHealValue < 0);
        return hasHealingCode && doesAnyHealing && doesNoDamage;
    };
    /** Whether or not this has any effects registered. */
    HealEffects.prototype.Any = function () {
        return this.hp.length > 0 || this.mp.length > 0 || this.tp.length > 0;
    };
    HealEffects.Codes = Object.freeze([EffectCodes.HPHeal, EffectCodes.MPHeal, EffectCodes.TPHeal]);
    HealEffects.Null = Object.freeze(new HealEffects());
    return HealEffects;
}());
export { HealEffects };

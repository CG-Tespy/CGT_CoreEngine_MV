export var EffectCodes;
(function (EffectCodes) {
    EffectCodes[EffectCodes["HPHeal"] = 11] = "HPHeal";
    EffectCodes[EffectCodes["MPHeal"] = 12] = "MPHeal";
    EffectCodes[EffectCodes["TPHeal"] = 13] = "TPHeal";
    EffectCodes[EffectCodes["AddState"] = 21] = "AddState";
    EffectCodes[EffectCodes["RemoveState"] = 22] = "RemoveState";
    EffectCodes[EffectCodes["AddBuff"] = 31] = "AddBuff";
    EffectCodes[EffectCodes["AddDebuff"] = 32] = "AddDebuff";
    EffectCodes[EffectCodes["RemoveBuff"] = 33] = "RemoveBuff";
    EffectCodes[EffectCodes["RemoveDebuff"] = 34] = "RemoveDebuff";
    EffectCodes[EffectCodes["SpecialEffect"] = 41] = "SpecialEffect";
    EffectCodes[EffectCodes["Grow"] = 42] = "Grow";
    EffectCodes[EffectCodes["LearnSkill"] = 43] = "LearnSkill";
    EffectCodes[EffectCodes["CommonEvent"] = 44] = "CommonEvent";
})(EffectCodes || (EffectCodes = {}));

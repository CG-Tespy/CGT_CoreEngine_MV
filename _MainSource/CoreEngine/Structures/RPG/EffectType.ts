/**
 * The values are based off the codes the effect types are assigned
 * in the base Effect class.
 */
export enum EffectType
{
    Null = -1,
    HPHeal = Game_Action.EFFECT_RECOVER_HP,
    MPHeal = Game_Action.EFFECT_RECOVER_MP,
    TPHeal = Game_Action.EFFECT_GAIN_TP,
    AddState = Game_Action.EFFECT_ADD_STATE,
    RemoveState = Game_Action.EFFECT_REMOVE_STATE,
    AddBuff = Game_Action.EFFECT_ADD_BUFF,
    AddDebuff = Game_Action.EFFECT_ADD_DEBUFF,
    RemoveBuff = Game_Action.EFFECT_REMOVE_BUFF,
    RemoveDebuff = Game_Action.EFFECT_REMOVE_DEBUFF,
    SpecialEffect = Game_Action.EFFECT_SPECIAL,
    Grow = Game_Action.EFFECT_GROW,
    LearnSkill = Game_Action.EFFECT_LEARN_SKILL,
    CommonEvent = Game_Action.EFFECT_COMMON_EVENT,
}
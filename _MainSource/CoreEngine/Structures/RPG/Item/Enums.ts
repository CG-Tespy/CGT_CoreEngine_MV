export enum ItemType
{
    Regular = 1, 
    Key = 2, 
    HiddenA = 3, 
    HiddenB = 4
}

/**
 * The values are based off the codes the effect types are assigned
 * in the base Effect class.
 */
export enum EffectType
{
    Null = -1,
    HPHeal = 11,
    MPHeal = 12, 
    TPGain = 13,
    AddState = 21,
    RemoveState = 22,
    AddBuff = 31,
    AddDebuff = 32,
    RemoveBuff = 33,
    RemoveDebuff = 34,
    SpecialEffect = 41,
    Grow = 42,
    LearnSkill = 43,
    CommonEvent = 44
}

export enum ItemOccasion
{
    Always = 0, 
    BattleOnly = 1, 
    MenuOnly = 2, 
    Never = 3
}

export enum ItemCategory
{
    Healing, 
    Damage, 
}

export enum ItemScope
{
    None = 0, 

    OneEnemy = 1, 
    AllEnemies = 2, 

    OneRandEnemy = 3, 
    TwoRandEnemy = 4, 
    ThreeRandEnemy = 5, 
    FourRandEnemy = 6,

    OneAlly = 7,
    AllAllies = 8,
    OneAllyDead = 9,
    AllAlliesDead = 10,

    TheUser = 11
}

export enum DamageType
{
    None,
    HPDamage,
    MPDamage,
    HPRecover,
    MPRecover,
    HPDrain,
    MPDrain
}

export enum HitType
{
    Null = -1,
    CertainHit = 0,
    Physical = 1,
    Magical = 2
}
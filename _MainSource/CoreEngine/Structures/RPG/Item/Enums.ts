export enum ItemType
{
    Regular = 1, 
    Key = 2, 
    HiddenA = 3, 
    HiddenB = 4
}

export enum ItemCategory
{
    Healing, 
    Damage, 
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
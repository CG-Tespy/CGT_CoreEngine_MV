/** Targeting scope of skills and items. */
export enum Scope
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
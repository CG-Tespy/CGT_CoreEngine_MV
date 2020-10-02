export class Game_ActorEx
{
    /**
     * Returns true if the actor can pay the skill's cost the specified 
     * number of times (1 by default).
     */
    static CanPaySkillCost(actor: Game_Actor, skill: RPG.Skill, 
        howManyTimes: number = 1): boolean
    {
        return actor.mp >= (skill.mpCost * howManyTimes);
    }

    static IsAtFullHP(actor: Game_Actor): boolean
    {
        return actor.hp >= actor.mhp;
    }

    static IsAtFullMP(actor: Game_Actor): boolean
    {
        return actor.mp >= actor.mmp;
    }

    static IsAtFullTP(actor: Game_Actor): boolean
    {
        return actor.tp >= actor.maxTp();
    }
}
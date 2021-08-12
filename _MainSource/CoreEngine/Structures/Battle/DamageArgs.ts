/**
 * Contains info relating to some skill being landed. 
 */
export class DamageArgs
{
    /** Skill used to do the damage, if applicable. */
    get Skill(): RPG.Skill { return this.skill; }
    private skill: RPG.Skill = null;
    set Skill(value) { this.skill = value; }

    /** Item used to do the damage, if applicable. */
    get Item(): RPG.Item { return this.item; }
    private item: RPG.Item = null;
    set Item(value) { this.item = value; }

    /** The battler that used the skill. */
    get User(): Game_Battler { return this.user; }
    private user: Game_Battler = null;
    set User(value) { this.user = value; }

    /** Whether or not a crit was landed. */
    get LandedCrit(): boolean { return this.Result.critical; }

    /** The target's Game_ActionResult object. Same as calling Target.result() */
    get Result(): Game_ActionResult { return this.Target.result(); }

    /** How much damage the skill dealt to the target. */
    get HPDamageDealt(): number { return this.Result.hpDamage; }
    get MPDamageDealt(): number { return this.Result.mpDamage; }
    get TPDamageDealt(): number { return this.Result.tpDamage; }

    /** States successfully applied to the target by the Skill. */
    get StatesApplied(): RPG.State[] { return this.Result.addedStateObjects(); }

    /** The battlers that got damaged. */
    get Target(): Game_Battler { return this.target; }
    private target: Game_Battler = null;
    set Target(value) { this.target = value; }


    static From(target: Game_Battler, action: Game_Action): DamageArgs
    {
        let damageArgs = new DamageArgs();
        damageArgs.User = action.subject();
        damageArgs.Target = target;

        if (action.isSkill())
            damageArgs.Skill = action.item() as RPG.Skill;
        else
            damageArgs.Item = action.item() as RPG.Item;

        return damageArgs;
        
    }

}
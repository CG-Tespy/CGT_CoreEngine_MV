import { HealEffectSet } from "../RPG/HealEffectSet"
import { DamageType } from "../RPG/DamageType"
import { Scope } from '../RPG/Scope';
import { Game_ActorEx } from './Game_ActorEx';

let CanPaySkillCost = Game_ActorEx.CanPaySkillCost;

/**
 * Makes it easier to work with Skills.
 */
export class RPGSkillEx
{
    /** Returns whether the skill's damage type is HP Recovery. */
    static CanHealHP(item: RPG.Skill): boolean
    {
        return item.damage.type == DamageType.HPRecovery;
    }

    /** Returns whether the skill's damage type is MP Recovery. */
    static CanHealMP(item: RPG.Skill): boolean
    {
        return item.damage.type == DamageType.MPRecovery;
    }

    static OnlyHealsHP(skill: RPG.Skill): boolean
    {
        let rightType = skill.damage.type == DamageType.HPRecovery;
        let healEffects = HealEffectSet.From(skill);
        return rightType && healEffects.Length == skill.effects.length;
    }

    /**
     * Returns false if the skill is not single-targeting, if
     * the user can't pay the cost, or if the user can't use the
     * skill legitimately. True otherwise.
     */
    static UseSkillOnActor(skill: RPG.Skill, user: Game_Actor, target: Game_Actor): boolean
    {
        if (!CanPaySkillCost(user, skill) || !this.IsSingleTargeting(skill)
        || !user.canUse(skill))
            return false;

        this.GetSkillCostPaid(skill, user);
        return this.FreeUseSkillOnActor(skill, user, target);
    }

    /**
     * Has the user cast the skill on the target without paying the cost.
     * Returns false if the skill isn't single-targeting, or if the user can't
     * legit use the skill. True otherwise.
     */
    static FreeUseSkillOnActor(skill: RPG.Skill, user: Game_Actor, target: Game_Actor): boolean
    {
        if (!this.IsSingleTargeting(skill) || !user.canUse(skill))
            return false;

        let skillUse = new Game_Action(user, false);
        skillUse.setItemObject(skill);

        for (let i = 0; i < skillUse.numRepeats(); i++)
            skillUse.apply(target);

        this.EnsureCommonEventsHappen(skillUse);

        return true;
    }

    static IsSingleTargeting(skill: RPG.Skill): boolean
    {
        return skill.scope == Scope.OneAlly 
        || skill.scope == Scope.OneAllyDead 
        || skill.scope == Scope.OneEnemy;
    }

    private static GetSkillCostPaid(skill: RPG.Skill, user: Game_Actor, howManyTimes: number = 1)
    {
        for (let i = 0; i < howManyTimes; i++)
            user.useItem(skill);
    }

    private static EnsureCommonEventsHappen(action: Game_Action)
    {
        // Despite the name suggesting otherwise, that's what the applyGlobal
        // method does: make sure Common Events in item/skill Effect lists 
        // happen.
        action.applyGlobal();
    }

    static IsAllTargeting(skill: RPG.Skill): boolean
    {
        return skill.scope == Scope.AllAllies ||
        skill.scope == Scope.AllAlliesDead ||
        skill.scope == Scope.AllEnemies;
    }

    /**
     * If the skill is single-targeting, it'll be used once on each 
     * target (applied only when possible).
     * Returns false if the user can't pay the cost for applying
     * the skill to each target, or if the user can't even use the skill
     * legitimately. 
     * True otherwise.
     */
    static UseSkillOnActors(skill: RPG.Skill, user: Game_Actor, targets: Game_Actor[]): boolean
    {
        // Get the skill cost paid as many times as needed
        let timesToPaySkillCost = this.TimesNeededToApplySkill(skill, targets, user);

        if (!CanPaySkillCost(user, skill, timesToPaySkillCost)
        || !user.canUse(skill))
            return false;

        for (let i = 0; i < timesToPaySkillCost; i++)
            this.GetSkillCostPaid(skill, user);

        return this.FreeUseSkillOnActors(skill, user, targets);
    }

    /**
     * Has the user cast the skill on each target, without paying the cost.
     * Returns false if the user can't use the skill legitimately.
     * True otherwise.
     */
    static FreeUseSkillOnActors(skill: RPG.Skill, user: Game_Actor, targets: Game_Actor[]): boolean
    {
        if (!user.canUse(skill))
            return false;

        // Now get things applied
        let skillUse = new Game_Action(user, false);
        skillUse.setItemObject(skill);

        for (const targetEl of targets)
        {
            // ...Yes, what the testApply function really does is return whether
            // the action should be applied (though not all reasonable criteria
            // are considered in it).
            let shouldApplySkill = skillUse.testApply(targetEl);
            if (!shouldApplySkill)
                continue;

            for (let i = 0; i < skillUse.numRepeats(); i++)
            {
                skillUse.apply(targetEl);
            }
        }

        this.EnsureCommonEventsHappen(skillUse);

        return true;
    }

    private static TimesNeededToApplySkill(skill: RPG.Skill, targets: Game_Actor[], user?: Game_Actor)
    {
        let amount = 0;

        if (this.IsAllTargeting(skill))
            amount = 1;
        else
        {
            if (user == null)
                amount = targets.length;
            else
            {
                let skillUse = new Game_Action(user, false);
                skillUse.setItemObject(skill);

                for (let i = 0; i < targets.length; i++)
                {
                    let targetEl = targets[i];
                    let shouldApply = skillUse.testApply(targetEl);
                    if (shouldApply)
                        amount++;
                }
            }
        }

        return amount;

    }


}
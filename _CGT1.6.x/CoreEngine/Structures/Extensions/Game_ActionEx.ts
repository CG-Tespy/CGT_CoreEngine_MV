export class Game_ActionEx
{
    /** Returns the action's item if it's a skill. Null otherwise. */
    static AsSkill(action: Game_Action): RPG.Skill
    {
        var skill = $dataSkills[action.item().id];
        if (skill != undefined)
            return skill;
        else
            return null;
    }

    /** Returns the action's item if it's a normal item. Null otherwise. */
    static AsItem(action: Game_Action): RPG.UsableItem
    {
        var item = $dataItems[action.item().id];
        if (item != undefined)
            return item;
        else
            return null;
    }

    /** Returns this action's subject if the subject is an enemy. Null otherwise. */
    static SubjectAsEnemy(action: Game_Action): Game_Enemy
    {
        return <Game_Enemy>(<unknown> Game_ActionEx.SubjectAsType(action, Game_Enemy));
    }

    static SubjectAsType<T extends Function>(action: Game_Action, typeWanted: T): T
    {
        var subject = action.subject();
        
        if (subject instanceof typeWanted)
            return <T> (<unknown> subject);
        else
            return null;
    }

    /** Returns this action's subject if the subject is an actor. Null otherwise. */
    static SubjectAsActor(action: Game_Action): Game_Actor
    {
        return <Game_Actor>(<unknown> Game_ActionEx.SubjectAsType(action, Game_Actor));
    }
}
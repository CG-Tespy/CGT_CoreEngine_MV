export class Game_ActionEx {
    /** Returns the action's item if it's a skill. Null otherwise. */
    static AsSkill(action) {
        var skill = $dataSkills[action.item().id];
        if (skill != undefined)
            return skill;
        else
            return null;
    }
    /** Returns the action's item if it's a normal item. Null otherwise. */
    static AsItem(action) {
        var item = $dataItems[action.item().id];
        if (item != undefined)
            return item;
        else
            return null;
    }
    /** Returns this action's subject if the subject is an enemy. Null otherwise. */
    static SubjectAsEnemy(action) {
        return Game_ActionEx.SubjectAsType(action, Game_Enemy);
    }
    static SubjectAsType(action, typeWanted) {
        var subject = action.subject();
        if (subject instanceof typeWanted)
            return subject;
        else
            return null;
    }
    /** Returns this action's subject if the subject is an actor. Null otherwise. */
    static SubjectAsActor(action) {
        return Game_ActionEx.SubjectAsType(action, Game_Actor);
    }
}

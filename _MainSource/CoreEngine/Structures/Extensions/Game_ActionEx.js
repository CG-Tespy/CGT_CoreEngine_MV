var Game_ActionEx = /** @class */ (function () {
    function Game_ActionEx() {
    }
    /** Returns the action's item if it's a skill. Null otherwise. */
    Game_ActionEx.AsSkill = function (action) {
        var skill = $dataSkills[action.item().id];
        if (skill != undefined)
            return skill;
        else
            return null;
    };
    /** Returns the action's item if it's a normal item. Null otherwise. */
    Game_ActionEx.AsItem = function (action) {
        var item = $dataItems[action.item().id];
        if (item != undefined)
            return item;
        else
            return null;
    };
    /** Returns this action's subject if the subject is an enemy. Null otherwise. */
    Game_ActionEx.SubjectAsEnemy = function (action) {
        return Game_ActionEx.SubjectAsType(action, Game_Enemy);
    };
    Game_ActionEx.SubjectAsType = function (action, typeWanted) {
        var subject = action.subject();
        if (subject instanceof typeWanted)
            return subject;
        else
            return null;
    };
    /** Returns this action's subject if the subject is an actor. Null otherwise. */
    Game_ActionEx.SubjectAsActor = function (action) {
        return Game_ActionEx.SubjectAsType(action, Game_Actor);
    };
    return Game_ActionEx;
}());
export { Game_ActionEx };

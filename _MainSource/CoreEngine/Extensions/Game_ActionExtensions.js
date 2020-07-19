'use strict';
(function () {
    var extensions = {
        _subjectAsType: function (typeWanted) {
            var subject = this.subject();
            if (subject instanceof typeWanted)
                return subject;
            else
                return null;
        },
        /**
         * Returns the action's item if it's a skill. Null otherwise.
         * @returns {RPG.Skill} */
        asSkill: function () {
            var skill = $dataSkills[this.item().id];
            if (skill != undefined)
                return skill;
            else
                return null;
        },
        /**
         * Returns the action's item if it's a normal item. Null otherwise.
         * @returns {RPG.Item} */
        asItem: function () {
            var item = $dataItems[this.item().id];
            if (item != undefined)
                return item;
            else
                return null;
        },
        /**
         * Returns this action's subject if the subject is an enemy. Null otherwise.
         * @returns {Game_Enemy}
         */
        subjectAsEnemy: function () {
            return this._subjectAsType(Game_Enemy);
        },
        /**
         * Returns this action's subject if the subject is an actor. Null otherwise.
         * @returns {Game_Actor}
         */
        subjectAsActor: function () {
            return this._subjectAsType(Game_Actor);
        },
    };
    Object.assign(Game_Action.prototype, extensions);
})();

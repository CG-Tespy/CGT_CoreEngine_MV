'use strict';

(function()
{
    let oldDecideRandomTarget = Game_Action.prototype.decideRandomTarget;
    let oldTargetsForOpponents = Game_Action.prototype.targetsForOpponents;
    let oldTargetsForFriends = Game_Action.prototype.targetsForFriends;
    
    let extensions = 
    {
        _subjectAsType(this: Game_Action, typeWanted: any)
        {
            var subject = this.subject();
        
            if (subject instanceof typeWanted)
                return subject;
            else
                return null;
            
        },

        /** 
         * Returns the action's item if it's a skill. Null otherwise.
         * @returns {RPG.Skill} */
        asSkill(this: Game_Action)
        {
            var skill = $dataSkills[this.item().id];
            if (skill != undefined)
                return skill;
            else
                return null;
        },

        /** 
         * Returns the action's item if it's a normal item. Null otherwise.
         * @returns {RPG.Item} */
        asItem(this: Game_Action)
        {
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
        subjectAsEnemy(this: Game_Action)
        {
            // @ts-ignore
            return this._subjectAsType(Game_Enemy);
        },

        /**
         * Returns this action's subject if the subject is an actor. Null otherwise.
         * @returns {Game_Actor}
         */
        subjectAsActor(this: Game_Action)
        {
            // @ts-ignore
            return this._subjectAsType(Game_Actor);
        },

        get Targets(): Game_Battler[] { return this.target; },
        targets: [],

    };
    

    Object.assign(Game_Action.prototype, extensions);

})();

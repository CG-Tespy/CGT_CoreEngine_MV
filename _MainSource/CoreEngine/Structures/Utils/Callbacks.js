import { Event } from './Event';
export var Callbacks = SetupEvents();
function SetupEvents() {
    var callbacks = {
        TitleScreenStart: new Event(0),
        BattleStart: new Event(0),
        BattleEnd: new Event(1),
        DamageExecute: new Event(2),
        EnemyDeath: new Event(1),
    };
    return callbacks;
}
HookUpCallbacks();
function HookUpCallbacks() {
    // Funcs to alias
    var oldSceneTitleStart = Scene_Title.prototype.start;
    var oldStartBattle = BattleManager.startBattle;
    var oldEndBattle = BattleManager.endBattle;
    var oldExecuteDamage = Game_Action.prototype.executeDamage;
    var oldEnemyDeath = Game_Enemy.prototype.die;
    // Func aliases
    function NewSceneTitleStart() {
        oldSceneTitleStart.call(this);
        Callbacks.TitleScreenStart.Invoke();
    }
    function NewStartBattle() {
        oldStartBattle.call(this);
        Callbacks.BattleStart.Invoke();
    }
    function NewEndBattle(result) {
        oldEndBattle.call(this, result);
        Callbacks.BattleEnd.Invoke(result);
    }
    function NewExecuteDamage(target, value) {
        oldExecuteDamage.call(this, target, value);
        Callbacks.DamageExecute.Invoke(target, value);
    }
    function NewEnemyDie() {
        oldEnemyDeath.call(this);
        Callbacks.EnemyDeath.Invoke(this);
    }
    ApplyFuncAliases();
    function ApplyFuncAliases() {
        Scene_Title.prototype.start = NewSceneTitleStart;
        BattleManager.startBattle = NewStartBattle;
        BattleManager.endBattle = NewEndBattle;
        Game_Action.prototype.executeDamage = NewExecuteDamage;
        Game_Enemy.prototype.die = NewEnemyDie;
    }
}

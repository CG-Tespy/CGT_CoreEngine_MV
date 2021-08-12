import { Event } from './Event';
import { DamageArgs } from "../Battle/DamageArgs";
export let Callbacks = SetupEvents();

function SetupEvents()
{
    let callbacks =
    {
        TitleScreenStart: new Event(0),
        BattleStart: new Event(0),
        BattleEnd: new Event(1),
        DamageExecute: new Event(1),
        EnemyDeath: new Event(1),

        DamageExecuted: new Event(1),
        CriticalHit: new Event(1),
        AttackResisted: new Event(1),
        AttackNulled: new Event(1),
        WeaknessExploited: new Event(1),
        StateApplied: new Event(1)
    }; 

    return callbacks;
}

HookUpCallbacks();

function HookUpCallbacks()
{
    HookUpSceneCallbacks();
    HookUpBattleCallbacks();
}

function HookUpSceneCallbacks()
{
    let oldSceneTitleStart = Scene_Title.prototype.start;
    
    // Func aliases
    function NewSceneTitleStart(this: Scene_Title)
    {
        oldSceneTitleStart.call(this);
        Callbacks.TitleScreenStart.Invoke();
    }

    ApplyFuncAliases();

    function ApplyFuncAliases()
    {
        Scene_Title.prototype.start = NewSceneTitleStart;
    }
}

function HookUpBattleCallbacks()
{
    let oldStartBattle = BattleManager.startBattle;

    function NewStartBattle(this: typeof BattleManager)
    {
        oldStartBattle.call(this);
        Callbacks.BattleStart.Invoke();
    }

    let oldEndBattle = BattleManager.endBattle;

    function NewEndBattle(this: typeof BattleManager, result: number)
    {
        oldEndBattle.call(this, result);
        Callbacks.BattleEnd.Invoke(result);
    }

    let oldEnemyDeath = Game_Enemy.prototype.die;

    function NewEnemyDie(this: Game_Enemy)
    {
        oldEnemyDeath.call(this);
        Callbacks.EnemyDeath.Invoke(this);
    }

    ApplyAliases();

    function ApplyAliases()
    {
        BattleManager.startBattle = NewStartBattle;
        BattleManager.endBattle = NewEndBattle;
        
        Game_Enemy.prototype.die = NewEnemyDie;
    }

    HookUpDamageExecutionCallbacks();
}

function HookUpDamageExecutionCallbacks()
{
    let damageArgs: DamageArgs; 
    // Shared between the events. A unique copy is created for each call of executeDamage

    function NewExecuteDamage(this: Game_Action, target: Game_Battler, value: number)
    {
        oldExecuteDamage.call(this, target, value);

        damageArgs = DamageArgs.From(target, this);
        DamageExecute.Invoke(damageArgs);

        let result = target.result();
        InvokeBattleEventsAsNeeded.call(this, target, result);
    }

    let oldExecuteDamage = Game_Action.prototype.executeDamage;
    let DamageExecute = Callbacks.DamageExecute;
    
    function InvokeBattleEventsAsNeeded(target: Game_Battler, result: Game_ActionResult)
    {
        DamageExecuted.Invoke(damageArgs);

        if (result.critical)
            CriticalHit.Invoke(damageArgs);

        let statesWereApplied = result.addedStateObjects().length > 0;
        if (statesWereApplied)
            StateApplied.Invoke(damageArgs);

        InvokeElementRateEventsAsNeeded.call(this, target, result);
    }

    let DamageExecuted = Callbacks.DamageExecuted;
    let CriticalHit = Callbacks.CriticalHit;
    let StateApplied = Callbacks.StateApplied;
    let calcElementRate = Game_Action.prototype.calcElementRate;

    function InvokeElementRateEventsAsNeeded(target: Game_Battler, result: Game_ActionResult)
    {
        let elementRateApplied = calcElementRate.call(this, target);
        let weaknessExploited = elementRateApplied > 1;
        let attackResisted = elementRateApplied < 1 && elementRateApplied > 0;
        let attackNulled = elementRateApplied == 0;

        if (weaknessExploited)
            WeaknessExploited.Invoke(damageArgs);

        else if (attackResisted)
            AttackResisted.Invoke(damageArgs);

        else if (attackNulled)
            AttackNulled.Invoke(damageArgs);
    }

    let WeaknessExploited = Callbacks.WeaknessExploited;
    let AttackResisted = Callbacks.AttackResisted;
    let AttackNulled = Callbacks.AttackNulled;

    ApplyAliases();

    function ApplyAliases()
    {
        Game_Action.prototype.executeDamage = NewExecuteDamage;
    }
}

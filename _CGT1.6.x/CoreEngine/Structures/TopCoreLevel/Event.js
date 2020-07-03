import { ArrayEx } from '../Extensions/ArrayEx';
export class Event {
    /** Throws an exception if a negative number of args are passed. */
    constructor(argCount = 0) {
        this.argCount = argCount;
        this.callbacks = new Map();
        this.invocationStr = '';
        this.funcToCall = null;
        this.callerName = 'caller';
        this.CheckIfArgCountISValid(argCount);
        this.SetupCallbackInvocationString();
    }
    // Getters
    get ArgCount() { return this.argCount; }
    CheckIfArgCountISValid(argCount) {
        if (argCount < 0) {
            let message = 'Cannot init CGT Event with a negative arg count.';
            //alert(message);
            throw message;
        }
    }
    AddListener(func, caller = null) {
        if (this.callbacks.get(caller) == null)
            this.callbacks.set(caller, []);
        this.callbacks.get(caller).push(func);
    }
    RemoveListener(func, caller = null) {
        if (this.callbacks.get(caller) == null)
            return;
        let callbackArr = this.callbacks.get(caller);
        ArrayEx.Remove(callbackArr, func);
    }
    /**
     * Invokes all callbacks registered under this event. Throws an exception if an inappropriate
     * number of args is passed.
     * */
    Invoke(...args) {
        // Safety
        if (args.length != this.ArgCount) {
            let message = `ERROR: call to Event invoke() passed wrong amount of arguments. \
            Amount passed: ${args.length} Amount Needed: ${this.ArgCount}`;
            //alert(message);
            throw message;
        }
        // Going through the callers...
        let callers = Array.from(this.callbacks.keys());
        for (let i = 0; i < callers.length; i++) {
            let caller = callers[i];
            // Go through all the funcs registered under the caller, and execute them one by 
            // one with this object's invocation string.
            let toExecute = this.callbacks.get(caller);
            for (let i = 0; i < toExecute.length; i++) {
                this.funcToCall = toExecute[i];
                eval(this.invocationStr);
            }
        }
    }
    SetupCallbackInvocationString() {
        this.invocationStr = 'this.funcToCall.call(' + this.callerName;
        if (this.ArgCount > 0)
            this.invocationStr += ', ';
        else
            this.invocationStr += ')';
        for (let i = 0; i < this.ArgCount; i++) {
            let argString = 'arguments[' + i + ']';
            if (i == this.ArgCount - 1) // Are we at the last arg?
                argString += ');';
            else
                argString += ', ';
            this.invocationStr += argString;
        }
    }
    toString() {
        return '[object CGT.Core.Utils.Event]';
    }
}
;

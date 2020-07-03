import { InputSignaler } from './InputSignaler';
export class InputObserver {
    constructor() {
        this.ListenForInputs();
    }
    ListenForInputs() {
        InputSignaler.InputLongPressed.AddListener(this.OnInputLongPressed, this);
        InputSignaler.InputPressed.AddListener(this.OnInputPressed, this);
        InputSignaler.InputTriggered.AddListener(this.OnInputTriggered, this);
        InputSignaler.InputRepeated.AddListener(this.OnInputRepeated, this);
    }
    // Override any one of these
    OnInputTriggered(input) { }
    OnInputPressed(input) { }
    OnInputLongPressed(input) { }
    OnInputRepeated(input) { }
    Destroy() {
        this.UnlistenForInputs();
    }
    UnlistenForInputs() {
        InputSignaler.InputLongPressed.RemoveListener(this.OnInputLongPressed, this);
        InputSignaler.InputPressed.RemoveListener(this.OnInputPressed, this);
        InputSignaler.InputTriggered.RemoveListener(this.OnInputTriggered, this);
        InputSignaler.InputRepeated.RemoveListener(this.OnInputRepeated, this);
    }
}
InputObserver.Null = Object.freeze(new InputObserver());
;

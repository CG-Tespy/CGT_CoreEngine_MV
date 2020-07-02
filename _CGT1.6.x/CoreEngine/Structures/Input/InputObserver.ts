import { InputSignaler } from './InputSignaler';

export class InputObserver
{
    constructor()
    {
        this.ListenForInputs();
    }

    protected ListenForInputs(): void
    {
        InputSignaler.InputLongPressed.AddListener(this.OnInputLongPressed, this);
        InputSignaler.InputPressed.AddListener(this.OnInputPressed, this);
        InputSignaler.InputTriggered.AddListener(this.OnInputTriggered, this);
        InputSignaler.InputRepeated.AddListener(this.OnInputRepeated, this);
    }

    // Override any one of these
    OnInputTriggered(input: string): void {}
    OnInputPressed(input: string): void {}
    OnInputLongPressed(input: string): void {}
    OnInputRepeated(input: string): void {}

    Destroy(): void
    {
        this.UnlistenForInputs();
    }

    protected UnlistenForInputs(): void
    {
        InputSignaler.InputLongPressed.RemoveListener(this.OnInputLongPressed, this);
        InputSignaler.InputPressed.RemoveListener(this.OnInputPressed, this);
        InputSignaler.InputTriggered.RemoveListener(this.OnInputTriggered, this);
        InputSignaler.InputRepeated.RemoveListener(this.OnInputRepeated, this);
    }

    static Null = Object.freeze(new InputObserver());
};



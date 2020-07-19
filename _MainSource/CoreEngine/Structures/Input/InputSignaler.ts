import { Event } from '../Utils/Event';
import { ArrayEx } from '../Extensions/ArrayEx';

type InputCheckFunc = (keyName: string) => void;

class SignalerImplementation
{
    protected inputCheckFuncs: Array<InputCheckFunc>;

    protected inputEvents = new Map<InputCheckFunc, Event>();

    protected inputs = [
        'tab',
        'ok',
        'shift',
        'control',
        'escape',
        'pageup',
        'pagedown',
        'left',
        'up',
        'right',
        'down',
        'debug'
    ];

    protected inputPressed = new Event(1);
    protected inputRepeated = new Event(1);
    protected inputTriggered = new Event(1);
    protected inputLongPressed = new Event(1);

    get InputPressed() { return this.inputPressed; }
    get InputRepeated() { return this.inputRepeated; }
    get InputTriggered() { return this.inputTriggered; }
    get InputLongPressed() { return this.inputLongPressed; }

    constructor()
    {
        this.InitInputEventDict();
        this.inputCheckFuncs = ArrayEx.From(this.inputEvents.keys());
    }

    protected InitInputEventDict(): void
    {
        this.inputEvents.set(Input.isPressed, this.InputPressed);
        this.inputEvents.set(Input.isRepeated, this.InputRepeated);
        this.inputEvents.set(Input.isTriggered, this.InputTriggered);
        this.inputEvents.set(Input.isLongPressed, this.InputLongPressed);
    }

    HandleInputSignaling(): void
    {
        for (let currentInput of this.inputs)
        {
            for (let userEnteredInput of this.inputCheckFuncs)
            {
                if (userEnteredInput.call(Input, currentInput) === true) 
                {
                    let eventToInvoke = this.inputEvents.get(userEnteredInput);
                    eventToInvoke.Invoke(currentInput);
                }
            }
        }
        
    }

};

export let InputSignaler = new SignalerImplementation();

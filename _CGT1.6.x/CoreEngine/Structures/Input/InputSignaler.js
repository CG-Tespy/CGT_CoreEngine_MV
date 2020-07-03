import { Event } from '../TopCoreLevel/Event';
class SignalerImplementation {
    constructor() {
        this.inputEvents = new Map();
        this.inputs = [
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
        this.inputPressed = new Event(1);
        this.inputRepeated = new Event(1);
        this.inputTriggered = new Event(1);
        this.inputLongPressed = new Event(1);
        this.InitInputEventDict();
        this.inputCheckFuncs = Array.from(this.inputEvents.keys());
    }
    get InputPressed() { return this.inputPressed; }
    get InputRepeated() { return this.inputRepeated; }
    get InputTriggered() { return this.inputTriggered; }
    get InputLongPressed() { return this.inputLongPressed; }
    InitInputEventDict() {
        this.inputEvents.set(Input.isPressed, this.InputPressed);
        this.inputEvents.set(Input.isRepeated, this.InputRepeated);
        this.inputEvents.set(Input.isTriggered, this.InputTriggered);
        this.inputEvents.set(Input.isLongPressed, this.InputLongPressed);
    }
    HandleInputSignaling() {
        for (let currentInput of this.inputs) {
            for (let userEnteredInput of this.inputCheckFuncs) {
                if (userEnteredInput.call(Input, currentInput) === true) {
                    let eventToInvoke = this.inputEvents.get(userEnteredInput);
                    eventToInvoke.Invoke(currentInput);
                }
            }
        }
    }
}
;
export let InputSignaler = new SignalerImplementation();

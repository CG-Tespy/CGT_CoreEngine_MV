import { InputSignaler } from './InputSignaler';
var InputObserver = /** @class */ (function () {
    function InputObserver() {
        this.ListenForInputs();
    }
    InputObserver.prototype.ListenForInputs = function () {
        InputSignaler.InputLongPressed.AddListener(this.OnInputLongPressed, this);
        InputSignaler.InputPressed.AddListener(this.OnInputPressed, this);
        InputSignaler.InputTriggered.AddListener(this.OnInputTriggered, this);
        InputSignaler.InputRepeated.AddListener(this.OnInputRepeated, this);
    };
    // Override any one of these
    InputObserver.prototype.OnInputTriggered = function (input) { };
    InputObserver.prototype.OnInputPressed = function (input) { };
    InputObserver.prototype.OnInputLongPressed = function (input) { };
    InputObserver.prototype.OnInputRepeated = function (input) { };
    InputObserver.prototype.Destroy = function () {
        this.UnlistenForInputs();
    };
    InputObserver.prototype.UnlistenForInputs = function () {
        InputSignaler.InputLongPressed.RemoveListener(this.OnInputLongPressed, this);
        InputSignaler.InputPressed.RemoveListener(this.OnInputPressed, this);
        InputSignaler.InputTriggered.RemoveListener(this.OnInputTriggered, this);
        InputSignaler.InputRepeated.RemoveListener(this.OnInputRepeated, this);
    };
    InputObserver.Null = Object.freeze(new InputObserver());
    return InputObserver;
}());
export { InputObserver };
;

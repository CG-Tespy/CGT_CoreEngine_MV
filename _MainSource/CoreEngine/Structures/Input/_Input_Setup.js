import { InputSignaler } from "./InputSignaler";
export * from "./InputCode";
export * from "./InputObserver";
export * from "./InputSignaler";
AttachInputSignalerToScenes();
function AttachInputSignalerToScenes() {
    var oldSceneUpdate = Scene_Base.prototype.update;
    function NewSceneUpdate() {
        oldSceneUpdate.call(this);
        InputSignaler.HandleInputSignaling();
    }
}

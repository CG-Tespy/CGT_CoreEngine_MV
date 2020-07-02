/**
 * To help create custom types out of Plugin Params.
 */
export class PluginParamObjectFactory {
    static get ClassOfObjectCreated() { return Object; }
    // @ts-ignore
    get ClassOfObjectCreated() { return this.constructor.ClassOfObjectCreated; }
    CreateObjectFrom(param) {
        this.paramToCreateFrom = param;
        this.ParseParamOnce();
        this.baseObject = this.CreateBaseObject();
        this.ApplyParamValuesToBaseObject();
        return this.baseObject;
    }
    ParseParamOnce() {
        this.parsedParam = JSON.parse(this.paramToCreateFrom);
    }
    CreateBaseObject() {
        return new this.ClassOfObjectCreated();
    }
    ApplyParamValuesToBaseObject() {
        this.ApplyPrimitiveValues();
        this.ApplyCustomValues();
    }
    ApplyPrimitiveValues() {
        this.ApplyBooleans();
        this.ApplyNumbers();
        this.ApplyStrings();
    }
    ApplyBooleans() { }
    ApplyNumbers() { }
    ApplyStrings() { }
    ApplyCustomValues() { }
    CreateObjectsFrom(stringifiedParamArr) {
        let inputAsStringArr = JSON.parse(stringifiedParamArr);
        return this.ConvertParamStringsToObjects(inputAsStringArr);
    }
    ConvertParamStringsToObjects(paramStrings) {
        let objects = [];
        for (let i = 0; i < paramStrings.length; i++) {
            let unparsedParam = paramStrings[i];
            let createdObject = this.CreateObjectFrom(unparsedParam);
            objects.push(createdObject);
        }
        return objects;
    }
}

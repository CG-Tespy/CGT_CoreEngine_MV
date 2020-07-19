/**
 * To help create custom types out of Plugin Params.
 */
var PluginParamObjectFactory = /** @class */ (function () {
    function PluginParamObjectFactory() {
    }
    Object.defineProperty(PluginParamObjectFactory, "ClassOfObjectCreated", {
        get: function () { return Object; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginParamObjectFactory.prototype, "ClassOfObjectCreated", {
        // @ts-ignore
        get: function () { return this.constructor.ClassOfObjectCreated; },
        enumerable: false,
        configurable: true
    });
    PluginParamObjectFactory.prototype.CreateObjectFrom = function (param) {
        this.paramToCreateFrom = param;
        this.ParseParamOnce();
        this.baseObject = this.CreateBaseObject();
        this.ApplyParamValuesToBaseObject();
        return this.baseObject;
    };
    PluginParamObjectFactory.prototype.ParseParamOnce = function () {
        this.parsedParam = JSON.parse(this.paramToCreateFrom);
    };
    PluginParamObjectFactory.prototype.CreateBaseObject = function () {
        return new this.ClassOfObjectCreated();
    };
    PluginParamObjectFactory.prototype.ApplyParamValuesToBaseObject = function () {
        this.ApplyPrimitiveValues();
        this.ApplyCustomValues();
    };
    PluginParamObjectFactory.prototype.ApplyPrimitiveValues = function () {
        this.ApplyBooleans();
        this.ApplyNumbers();
        this.ApplyStrings();
    };
    PluginParamObjectFactory.prototype.ApplyBooleans = function () { };
    PluginParamObjectFactory.prototype.ApplyNumbers = function () { };
    PluginParamObjectFactory.prototype.ApplyStrings = function () { };
    PluginParamObjectFactory.prototype.ApplyCustomValues = function () { };
    PluginParamObjectFactory.prototype.CreateObjectsFrom = function (stringifiedParamArr) {
        var inputAsStringArr = JSON.parse(stringifiedParamArr);
        return this.ConvertParamStringsToObjects(inputAsStringArr);
    };
    PluginParamObjectFactory.prototype.ConvertParamStringsToObjects = function (paramStrings) {
        var objects = [];
        for (var i = 0; i < paramStrings.length; i++) {
            var unparsedParam = paramStrings[i];
            var createdObject = this.CreateObjectFrom(unparsedParam);
            objects.push(createdObject);
        }
        return objects;
    };
    return PluginParamObjectFactory;
}());
export { PluginParamObjectFactory };

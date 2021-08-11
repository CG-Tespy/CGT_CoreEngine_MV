/**
 * To help create custom types out of Plugin Params.
 */
export class PluginParamObjectFactory<TReal, TParsedRaw>
{

    static get ClassOfObjectCreated(): Function { return Object; }
    
    // @ts-ignore
    get ClassOfObjectCreated(): any { return this.constructor.ClassOfObjectCreated; }

    protected paramToCreateFrom: string;
    protected parsedParam: TParsedRaw;
    protected baseObject: TReal;

    CreateObjectFrom(param: string): TReal
    {
        this.paramToCreateFrom = param;
        this.ParseParamOnce();

        this.baseObject = this.CreateBaseObject();
        this.ApplyParamValuesToBaseObject();

        return this.baseObject;
    }

    protected ParseParamOnce(): void
    {
        this.parsedParam = JSON.parse(this.paramToCreateFrom);
    }

    protected CreateBaseObject(): TReal
    {
        return new this.ClassOfObjectCreated();
    }

    protected ApplyParamValuesToBaseObject(): void
    {
        this.ApplyPrimitiveValues();
        this.ApplyCustomValues();
    }

    protected ApplyPrimitiveValues(): void
    {
        this.ApplyBooleans();
        this.ApplyNumbers();
        this.ApplyStrings();
    }

    protected ApplyBooleans(): void { }

    protected ApplyNumbers(): void { }

    protected ApplyStrings(): void { }

    protected ApplyCustomValues(): void { }

    CreateObjectsFrom(stringifiedParamArr): TReal[]
    {
        let inputAsStringArr = JSON.parse(stringifiedParamArr);

        return this.ConvertParamStringsToObjects(inputAsStringArr);
    }

    protected ConvertParamStringsToObjects(paramStrings): TReal[]
    {
        let objects = [];

        for (let i = 0; i < paramStrings.length; i++)
        {
            let unparsedParam = paramStrings[i];
            let createdObject = this.CreateObjectFrom(unparsedParam);
            objects.push(createdObject);
        }

        return objects;
    }

}

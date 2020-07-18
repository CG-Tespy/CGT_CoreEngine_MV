export abstract class ObjectEx
{
    static IsOfType(obj: any, input: Function): boolean
    {
        let inputIsFunction = typeof input === 'function';

        if (!inputIsFunction)
        {
            console.log("Input is not function");
            throw 'IsOfType only accepts function or class args.';
        }

        let classOfObj: Function = obj.constructor;

        return this.IsOfExactType(obj, input) ||
        input.isPrototypeOf(classOfObj) || 
        classOfObj.isPrototypeOf(input);
    }

    static IsOfExactType(obj: any, input: Function): boolean
    {
        let inputIsFunction = typeof input === 'function';

        if (!inputIsFunction)
        {
            throw 'isOfExactType only accepts function or class args.';
        }

        return obj.constructor === input;
    }
}
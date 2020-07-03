export class ObjectEx {
    static IsOfType(obj, input) {
        let inputIsFunction = typeof input === 'function';
        if (!inputIsFunction) {
            console.log("Input is not function");
            throw 'IsOfType only accepts function or class args.';
        }
        let classOfObj = obj.constructor;
        return this.IsOfExactType(obj, input) ||
            input.isPrototypeOf(classOfObj) ||
            classOfObj.isPrototypeOf(input);
    }
    static IsOfExactType(obj, input) {
        let inputIsFunction = typeof input === 'function';
        if (!inputIsFunction) {
            throw 'isOfExactType only accepts function or class args.';
        }
        return obj.constructor === input;
    }
}

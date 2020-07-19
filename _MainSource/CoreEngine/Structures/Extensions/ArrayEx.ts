export type ArrayFindPredicate<T> = (element: T, index?: number, arr?: T[] | Readonly<T>) => boolean;

export class ArrayEx
{
    static Remove(arr: Array<any>, toRemove: any): void
    {
        let index = arr.indexOf(toRemove);

        if (index >= 0)
            arr.splice(index, 1);
    }

    static Copy(arr: Array<any> | Readonly<Array<any>>): Array<any>
    {
        return arr.slice();
    }

    static Filter(arr: Array<any> | Readonly<Array<any>>, test: Function, context: any): Array<any>
    {
        context = context || arr; // context is optional
        let result = [];

        for (let i = 0; i < arr.length; i++)
        {
            let item = arr[i];
            let passedTest = test.call(context, item) === true;
            if (passedTest)
                result.push(item);
        }

        return result;
    }

    static Clear(arr: Array<any>): void
    {
        while (arr.length > 0)
            arr.shift();
    }

    /**
     * MV 1.5.1 doesn't support the Array.from function, so this works as a replacement.
     * @param iterable 
     */
    static From<T>(iterable: Iterable<T>): T[]
    {
        let result = [];
        for (let element of iterable)
        {
            result.push(element);
        }

        return result;
    }

    static Includes(arr: Array<any> | Readonly<Array<any>>, item: any): boolean
    {
        for (let element of arr)
            if (element === item)
                return true;

        return false;
    }

    static Find<T>(arr: Array<T> | Readonly<Array<T>>, 
        predicate: ArrayFindPredicate<T>, 
        thisArg: any = null): T
    {
        for (let index = 0; index < arr.length; index++)
        {
            let element = arr[index];
            if (predicate.call(thisArg, element, index, arr))
                return element;
        }

        return undefined;
    }
}
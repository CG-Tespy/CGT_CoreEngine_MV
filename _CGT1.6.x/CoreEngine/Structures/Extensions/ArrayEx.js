export class ArrayEx {
    static Remove(arr, toRemove) {
        let index = arr.indexOf(toRemove);
        if (index >= 0)
            arr.splice(index, 1);
    }
    static Copy(arr) {
        return arr.slice();
    }
    static Filter(arr, test, context) {
        context = context || arr; // context is optional
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            let item = this[i];
            let passedTest = test.call(context, item) === true;
            if (passedTest)
                result.push(item);
        }
        return result;
    }
    static Clear(arr) {
        while (arr.length > 0)
            arr.shift();
    }
}

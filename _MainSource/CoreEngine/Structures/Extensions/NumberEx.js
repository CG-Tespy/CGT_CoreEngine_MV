var NumberEx = /** @class */ (function () {
    function NumberEx() {
    }
    NumberEx.Clamp = function (num, min, max) {
        return Math.min(Math.max(num, min), max);
    };
    NumberEx.ClampInt = function (num, min, max) {
        return Math.floor(this.Clamp(num, min, max));
    };
    NumberEx.Mod = function (num1, num2) {
        return ((num1 % num2) + num2) % num2;
    };
    NumberEx.PadZero = function (num, length) {
        var s = "" + num;
        while (s.length < length) {
            s = '0' + s;
        }
        return s;
    };
    NumberEx.Rand = function (from, to) {
        var num = from;
        var difference = to - from;
        num += Math.random() * difference;
        return num;
    };
    NumberEx.RandInt = function (from, to) {
        return Math.floor(this.Rand(from, to));
    };
    NumberEx.Lerp = function (firstNum, secondNum, progress) {
        var difference = secondNum - firstNum;
        return firstNum + (difference * progress);
    };
    return NumberEx;
}());
export { NumberEx };

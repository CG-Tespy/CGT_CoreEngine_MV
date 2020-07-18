export class NumberEx {
    static Clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }
    static ClampInt(num, min, max) {
        return Math.floor(this.Clamp(num, min, max));
    }
    static Mod(num1, num2) {
        return ((num1 % num2) + num2) % num2;
    }
    static PadZero(num, length) {
        var s = "" + num;
        while (s.length < length) {
            s = '0' + s;
        }
        return s;
    }
    static Rand(from, to) {
        let num = from;
        let difference = to - from;
        num += Math.random() * difference;
        return num;
    }
    static RandInt(from, to) {
        return Math.floor(this.Rand(from, to));
    }
    static Lerp(firstNum, secondNum, progress) {
        var difference = secondNum - firstNum;
        return firstNum + (difference * progress);
    }
}

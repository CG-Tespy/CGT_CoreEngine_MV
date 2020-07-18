export abstract class NumberEx
{
    static Clamp(num: number, min: number, max: number): number
    {
        return Math.min(Math.max(num, min), max);
    }

    static ClampInt(num: number, min: number, max: number): number
    {
        return Math.floor(this.Clamp(num, min, max));
    }

    static Mod(num1: number, num2: number): number
    {
        return ((num1 % num2) + num2) % num2;
    }

    static PadZero(num: number, length: number): string
    {
        var s = "" + num;
        while (s.length < length) {
            s = '0' + s;
        }
        return s;
    }

    static Rand(from: number, to: number): number
    {
        let num = from;
        let difference = to - from;
        num += Math.random() * difference;
        
        return num;
    }

    static RandInt(from: number, to: number): number
    {
        return Math.floor(this.Rand(from, to));
    }

    static Lerp(firstNum: number, secondNum: number, progress: number): number
    {
        var difference = secondNum - firstNum;
        return firstNum + (difference * progress);
    }
}

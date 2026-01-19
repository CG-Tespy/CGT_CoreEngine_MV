export class SkillEx
{
    /** First letter capitalized, the rest in lowercase */
    static Capitalize(input: string)
    {
        let firstLetterCapitalized: string = input.charAt(0).toUpperCase();
        let theRestInLowercase: string = input.slice(1).toLowerCase();
        return firstLetterCapitalized + theRestInLowercase;
    };
}
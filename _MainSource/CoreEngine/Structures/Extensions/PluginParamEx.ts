import { RPGEx } from "../_Structures_Setup";

export class PluginParamEx 
{
    // For those stringified num param arrs
    static NumArrFromString(input: string): number[]
    {
        let parsed: string[] = JSON.parse(input);
        let numArr = [];

        for (const parsedEl of parsed)
        {
            numArr.push(Number(parsedEl));
        }

        return numArr;
    }

    // The ones with IDs tied to them
    static DatabaseElementsFromStringNumArr<TDatabaseElement extends RPG.Actor |
                                                RPG.Class | RPG.Skill | RPG.Item |
                                                RPG.Weapon | RPG.Armor | RPG.Enemy |
                                                RPG.Troop | RPG.State | RPG.Animation |
                                                RPG.Tileset | RPG.CommonEvent >(stringifiedNumArr: string, 
        databaseElemArr: TDatabaseElement[]):  TDatabaseElement[]
    {
        let theIDs: number[] = this.NumArrFromString(stringifiedNumArr);
        return this.DatabaseElementsFromNumArr(theIDs, databaseElemArr);
    }

    static DatabaseElementsFromNumArr<TDatabaseElement extends RPG.Actor |
                                                RPG.Class | RPG.Skill | RPG.Item |
                                                RPG.Weapon | RPG.Armor | RPG.Enemy |
                                                RPG.Troop | RPG.State | RPG.Animation |
                                                RPG.Tileset | RPG.CommonEvent >(numArr: number[], 
        databaseElemArr: TDatabaseElement[]):  TDatabaseElement[]
    {
        let dbElements = [];

        for (const id of numArr)
        {
            let currentState = databaseElemArr[id];
            dbElements.push(currentState);
        }

        return dbElements;
    }

    /** Takes variable codes into account (a la \V[x])*/
    static ParamArgToNumber(paramArg: string)
    {
        let IsVariable = PluginParamEx.IsVariable;
        let varRegex = PluginParamEx.varRegex;

        if (IsVariable(paramArg))
        {
            let matches = paramArg.match(varRegex);
            let varIndex = Number(matches[1]);
            let varValue = $gameVariables.value(varIndex);
            return varValue;
        }
        
        return Number(paramArg);
    }

    static IsVariable(input): boolean
    {
        let varRegex = PluginParamEx.varRegex;
        return varRegex.test(input);
    }

    static varRegex = /\\V\[(\d+)\]/i;

}
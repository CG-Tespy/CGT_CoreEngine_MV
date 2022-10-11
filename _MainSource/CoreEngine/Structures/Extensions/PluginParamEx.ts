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



}
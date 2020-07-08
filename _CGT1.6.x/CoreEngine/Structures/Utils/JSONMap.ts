// Credit to Dr. Axel Rauschmayer for this
export function MapToJSON(map: Map<any, any>)
{
    return JSON.stringify([...map]);
}

export function JSONToMap(json: string): Map<any, any>
{
    return new Map(JSON.parse(json));
}
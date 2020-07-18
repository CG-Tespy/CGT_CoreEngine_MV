// Credit to Dr. Axel Rauschmayer for this
export function MapToJSON(map) {
    return JSON.stringify([...map]);
}
export function JSONToMap(json) {
    return new Map(JSON.parse(json));
}

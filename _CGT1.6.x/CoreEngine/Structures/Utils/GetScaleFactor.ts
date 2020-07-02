export function GetScaleFactor(firstWidth: number, firstHeight: number, 
    secondWidth: number, secondHeight: number)
{
    // Algorithm credit to Michael Labe from Stack Overflow
    let windowAspect = firstWidth / firstHeight;
    let imageAspect = secondWidth / secondHeight;

    let scaleFactor = undefined;

    if (windowAspect > imageAspect)
        scaleFactor = firstHeight / secondHeight;
    else
        scaleFactor = firstWidth / secondWidth;

    return scaleFactor;
}
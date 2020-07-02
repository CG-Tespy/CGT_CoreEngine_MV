export function GetScaleFactor(firstWidth, firstHeight, secondWidth, secondHeight) {
    // Algorithm credit to Michael Labe from Stack Overflow
    let windowAspect = firstWidth / firstHeight;
    let imageAspect = secondWidth / secondHeight;
    let scaleFactor = 0;
    if (windowAspect > imageAspect)
        scaleFactor = firstHeight / secondHeight;
    else
        scaleFactor = firstWidth / secondWidth;
    return scaleFactor;
}

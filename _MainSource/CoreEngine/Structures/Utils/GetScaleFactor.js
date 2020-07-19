export function GetScaleFactor(firstWidth, firstHeight, secondWidth, secondHeight) {
    // Algorithm credit to Michael Labe from Stack Overflow
    var windowAspect = firstWidth / firstHeight;
    var imageAspect = secondWidth / secondHeight;
    var scaleFactor = undefined;
    if (windowAspect > imageAspect)
        scaleFactor = firstHeight / secondHeight;
    else
        scaleFactor = firstWidth / secondWidth;
    return scaleFactor;
}

//The logic of bracket scanning is pretty simple. Each time an open bracket is found, it's line number is pushed into an array. Each time a closing bracket is found, it is assigned to the last open bracket line number that was found. This takes into account the fact that brackets exist in layers. So each closing bracket must be closing the innermost layer (which will always be the last open bracket that was found).
function bracketScanner() {
  if (skipFunction == 0) {
    var openBracketArray = [];

    for (var lineSkipper = 0; lineSkipper < currentCommand.length; lineSkipper++) {
      if (currentCommand[lineSkipper].indexOf("{") !== -1) {
        openBracketArray.push(lineSkipper);
      }

      if (currentCommand[lineSkipper].indexOf("}") !== -1) {
        finalBracketArray.push([openBracketArray[openBracketArray.length - 1], lineSkipper]);

        openBracketArray.pop();
      }
    }
    skipFunction = 1;
  }
}
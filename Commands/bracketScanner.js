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
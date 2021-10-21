function bracketScanner() {
  if (skipFunction == 0) {
    var openBracketArray = [];

    for (var lineSkipper = 0; lineSkipper < varCommand.length; lineSkipper++) {
      if (varCommand[lineSkipper].indexOf("{") !== -1) {
        openBracketArray.push(lineSkipper);
      }

      if (varCommand[lineSkipper].indexOf("}") !== -1) {
        finalBracketArray.push([openBracketArray[openBracketArray.length - 1], lineSkipper]);

        openBracketArray.pop();
      }
    }
    skipFunction = 1;
  }
}
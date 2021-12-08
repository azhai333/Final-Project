function wordArrayCreator() {
  var quoteMode = false;
  for (var wordArray2 = 0; wordArray2 < varCommand.length; wordArray2++) {
    if (varCommand.length < previousCommand.length) {
      wordArray.splice(currentLineNumber + 1, 1);
      previousCommand.splice(currentLineNumber + 1, 1);
    }
    if (varCommand[wordArray2] != previousCommand[wordArray2]) {
      commandTmp = varCommand[wordArray2].split("");
      wordArray[wordArray2] = [["", 0]];
      for (
        var wordArrayMaker = 0;
        wordArrayMaker < commandTmp.length;
        wordArrayMaker++
      ) {
        if (commandTmp[wordArrayMaker] === "." || commandTmp[wordArrayMaker] === " " || commandTmp[wordArrayMaker] === "(" || commandTmp[wordArrayMaker] === ")" || commandTmp[wordArrayMaker] === ",") {
          if (quoteMode == true) {
            wordArray[wordArray2][wordArray[wordArray2].length - 1][0] +=
              commandTmp[wordArrayMaker];
          } else {
            wordArray[wordArray2].push([commandTmp[wordArrayMaker]]);
            wordArray[wordArray2][wordArray[wordArray2].length - 1].push(
              wordArrayMaker
            );
            wordArray[wordArray2].push([""]);
            wordArray[wordArray2][wordArray[wordArray2].length - 1].push(
              wordArrayMaker + 1
            );
          }
        } else if (
          commandTmp[wordArrayMaker] === '"' ||
          commandTmp[wordArrayMaker] === "'"
        ) {
          if (checkStart == 0) {
            startQuote = wordArrayMaker;
            checkStart = 1;
          }
          quoteMode = true;
          wordArray[wordArray2][wordArray[wordArray2].length - 1][0] +=
            commandTmp[wordArrayMaker];
          if (
            (wordArrayMaker != startQuote &&
              commandTmp[wordArrayMaker] === '"') ||
            commandTmp[wordArrayMaker] === "'"
          ) {
            wordArray[wordArray2].push([""]);
            wordArray[wordArray2][wordArray[wordArray2].length - 1].push(
              wordArrayMaker + 1
            );
            quoteMode = false;
            checkStart = 0;
          }
        } else {
          wordArray[wordArray2][wordArray[wordArray2].length - 1][0] +=
            commandTmp[wordArrayMaker];
        }
      }
      previousCommand[wordArray2] = varCommand[wordArray2];
    }
  }
  quoteMode = false;
}

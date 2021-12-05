function forLoop() {
    if (currentCommand[lineNumber].indexOf("for (") !== -1) {
        for (
            var bracketSearcher = 0;
            bracketSearcher < finalBracketArray.length;
            bracketSearcher++
          ) {
            if (finalBracketArray[bracketSearcher][0] == lineNumber) {
              bracketLineNumber = bracketSearcher;
            }
          }
        loopStart = lineNumber
        loopEnd = finalBracketArray[bracketLineNumber][1];
        loopIndex = commandRunner

        forStatement = currentCommand[lineNumber].split(";");

        changeEnd = forStatement[2].indexOf(")") - 1
        forChange = forStatement[2].substr(1, changeEnd)
        forCondition = forStatement[1].replace(/ /, "")

        if (conditionalProcessor(forCondition) == true) {
            loopMode = 1
            varMaker(forChange)
        } else {
            loopMode = 2
        }
    }
}
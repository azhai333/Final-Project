//Loops work pretty much the way you'd expect. One challenge was making it so that the variable that is declared in the for loop, gets declared, this involved modifying my varMaker function a bit. When a loop is detected, loopMode is set to 1, which causes commandRunner to continue running until the condition in the forLoop is false. I also take advantage of the conditionalProcessor function in ifChecker.js, which processes individual conditional statements such as "1 == 1", and returns a boolean.
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
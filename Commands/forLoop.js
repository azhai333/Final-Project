function forLoop() {
    if (currentCommand[lineNumber].indexOf("for (") !== -1) {
        forStatement = currentCommand[lineNumber].split(";");

        forStatement = forStatement[1].replace(/ /, "")

        console.log(conditionalProcessor(forStatement))
    }
}
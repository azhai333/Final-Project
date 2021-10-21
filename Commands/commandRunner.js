function commandRunnerFunction() {
      while (commandRunner < varCommand.length) {
      if (varCommand[lineNumber].indexOf("{") !== -1) {
        bracketScanner();
      }

        firstSpace = varCommand[lineNumber].indexOf(" ");
      firstWord = varCommand[lineNumber].substr(0, firstSpace);

      varMaker();
        
      consoleLogChecker();
      ifChecker();
      generalFunction();
      
      lineNumber += 1;
      commandRunner += 1;
    }
}
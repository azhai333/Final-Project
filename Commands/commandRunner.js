function commandRunnerFunction() {
      while (commandRunner < currentCommand.length) {
        if (runCommand == true) {
          firstCondition = "var "
          firstTime = true
        }
      if (currentCommand[lineNumber].indexOf("{") !== -1) {
        bracketScanner();
      }

      if (currentCommand[lineNumber].indexOf("background(") !== -1) {
        lineArray = [];
        rectArray = [];
      }

      if (level1 == true) {
        if (varCommand[lineNumber].indexOf("loadSoftware") !== -1) {
          printImage = true
        }
      }

      firstSpace = currentCommand[lineNumber].indexOf(" ");
      firstWord = currentCommand[lineNumber].substr(0, firstSpace);

      varMaker();
        
      consoleLogChecker();
      ifChecker();
      generalFunction();
      
      lineNumber += 1;
      commandRunner += 1;
    }
}
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

      if (varCommand[lineNumber].indexOf("level1") !== -1) {
        varCommand = ["function preload() {", 'loadSoftware("Brick_Wall.exe")', "}"]

        varCommandReset()
      }

      if (varCommand[lineNumber].indexOf("level2") !== -1) {
        varCommand = ['var userIdentity = "square"', 'if (userIdentity == "circle") {', "var borderWidth1 = width - 6", "var borderHeight1 = height - 6", "noFill(0)", "stroke(250, 0, 0)", "strokeWeight(10)", "rect(2, 2, borderWidth1, borderHeight1)", "}", 'if (userIdentity == "square") {', "var borderWidth1 = width - 6", "var borderHeight1 = height - 6", "noFill(0)", "stroke(0, 250, 0)", "strokeWeight(10)", "rect(2, 2, borderWidth1, borderHeight1)", "}"]

        varCommandReset()
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

function varCommandReset() {
  currentLineNumber = 0;
      highestLineNumber = varCommand.length - 1;
      linePositionArray = []
      for (var linePositionArrayMaker = 0; linePositionArrayMaker < varCommand.length; linePositionArrayMaker++) {
        linePositionArray.push(161 + linePositionArrayMaker * 18)
      }
      
      currentSpaceNumber = 0;
      
      highestSpaceNumber = [];
      horizontalPositionArray = [];
      
      for (var highestSpaceNumberMaker = 0; highestSpaceNumberMaker < varCommand.length; highestSpaceNumberMaker++) {
        highestSpaceNumber.push(varCommand[highestSpaceNumberMaker].length)
        horizontalPositionArray.push([])
      }
      
      for (var horizontalPositionArrayMaker = 0; horizontalPositionArrayMaker < horizontalPositionArray.length; horizontalPositionArrayMaker++) {
        for (var innerLoop = 0; innerLoop < highestSpaceNumber[horizontalPositionArrayMaker] + 1; innerLoop++) {
          horizontalPositionArray[horizontalPositionArrayMaker].push(74 + innerLoop * 9)
        }
      }

      if (varCommand.length > 25) {
        minScrollPos = (varCommand.length - 25) * -18
      }
}
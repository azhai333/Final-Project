//The command center of my code, at least when it comes to actually running the program within a program. It goes through currentCommand and runs searches for the cheat codes, if it finds them varCommand is reset to the specified value. This function also runs all the function in the command folder, such as bracketScanner, consolelog, forLoop, etc.
function commandRunnerFunction() {
  while (commandRunner < currentCommand.length) {
    if (runCommand == true) {
      firstCondition = "var "
      firstTime = true
    }
  if (currentCommand[lineNumber].indexOf("{") !== -1) {
    bracketScanner();
  }
  if (currentCommand[lineNumber].indexOf("draw(") !== -1) {
    drawMode = true;
  }

  if (currentCommand[lineNumber].indexOf("background(") !== -1) {
    lineArray = [];
    rectArray = [];
  }

  if (level1 == true) {
    if (currentCommand[lineNumber].indexOf("loadSoftware") !== -1) {
      printImage = true
    }
  }

  if (currentCommand[lineNumber].indexOf("level1") !== -1) {
    varCommand = ["function preload() {", 'loadSoftware("Brick_Wall.exe")', "}"]

    varCommandReset()
  }

  if (currentCommand[lineNumber].indexOf("level2") !== -1) {
    varCommand = ['var userIdentity = "square"', 'if (userIdentity == "circle") {', "var borderWidth1 = width - 6", "var borderHeight1 = height - 6", "noFill(0)", "stroke(250, 0, 0)", "strokeWeight(10)", "rect(2, 2, borderWidth1, borderHeight1)", "}", 'if (userIdentity == "square") {', "var borderWidth1 = width - 6", "var borderHeight1 = height - 6", "noFill(0)", "stroke(0, 250, 0)", "strokeWeight(10)", "rect(2, 2, borderWidth1, borderHeight1)", "}"]

    varCommandReset()
  }

  if (currentCommand[lineNumber].indexOf("level3") !== -1) {
    varCommand = ["function setup() {", "createCanvas(windowWidth, windowHeight)", "frameRate(20)", "}", "var state = 0", "var lin1x = 0", "var lin1y = 0", "var lin2x = 0", "var lin2y = 0", "var direction = 2", "var verticalGap = 0", "var horizontalGap = 0", "var c = 0", "function draw() {", "if (state == 0) {", "lin1x = (width / 2) - 3", "lin1y = (height / 2 + height / 40) - 20", "lin2x = lin1x", "lin2y = lin1y - height / 40", "verticalGap = height / 40", "horizontalGap = width / 40", "state = 1", "}", "colorMode(HSL, 360)", "stroke(c, 200, 200)", "strokeWeight(3)", "line(lin1x, lin1y, lin2x, lin2y)", "lin1x = lin2x", "lin1y = lin2y", "if (direction == 1) {", "verticalGap = verticalGap + height / 40", "lin2y = lin2y - verticalGap", "}", "if (direction == 2) {", "lin2x = lin2x + horizontalGap", "horizontalGap = horizontalGap + width / 40", "}", "if (direction == 3) {", "verticalGap = verticalGap + height / 40", "lin2y = lin2y + verticalGap", "}", "if (direction == 4) {", "lin2x = lin2x - horizontalGap", "horizontalGap = horizontalGap + width / 40", "direction = 0", "}", "direction++", "if (c > 360) {", "c = 0", "}", "if (c <= 360) {", "c = c + 7", "}", "}"
  ]

    varCommandReset()
  }

  if (currentCommand[lineNumber].indexOf("loopDemo") !== -1) {
    varCommand = ["var demo = 0", "for (var i = 0; i < 5; i++) {", "if (1 == 1 && 2 == 2) {", "demo++", "}", "}", "console.log(demo)"]

    varCommandReset()
  }

  for (var i=0; i<varList.length; i++) {
    if (currentCommand[lineNumber].indexOf(varList[i]) !== -1 && currentCommand[lineNumber].indexOf("var") == -1 && (currentCommand[lineNumber].indexOf("=") !== -1 || currentCommand[lineNumber].indexOf("++") !== -1)  && currentCommand[lineNumber].indexOf("if") == -1 && currentCommand[lineNumber].indexOf("console.log") == -1) {
      containsVar = true
    }
  }

  if (loopMode == 0 && (currentCommand[lineNumber].indexOf(firstCondition) !== -1 || containsVar == true)) {
      varMaker(currentCommand[lineNumber]);
    } else if (loopMode != 0 && containsVar == true && lineNumber != loopStart) {
      varMaker(currentCommand[lineNumber]);
    }
    
  consoleLogChecker();
  ifChecker();
  forLoop();
  generalFunction();

  if (loopMode == 1 && lineNumber == loopEnd) {
    lineNumber = loopStart
    commandRunner = loopIndex
  } else if (loopMode == 2) {
    lineNumber = loopEnd;
    commandRunner = loopEnd;
    loopMode = 0
  } else {
    lineNumber++
    commandRunner++
  }
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

